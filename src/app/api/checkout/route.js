// src/app/api/checkout/route.js

import Stripe from "stripe";
import { NextResponse } from 'next/server';
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// 1. CONFIGURAÇÃO DO FIREBASE ADMIN
// Inicializa o Firebase Admin SDK no lado do servidor, se ainda não estiver inicializado.
if (!getApps().length) {
    initializeApp({
        credential: applicationDefault(),
    });
}
const db = getFirestore();

// Inicializa o Stripe.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const reqBody = await request.json();
    // O cliente deve enviar apenas IDs e quantidades do carrinho, e o ID do frete.
    const { items: clientItems, frete: clientFrete } = reqBody;

    const FRONTEND_URL_SUCCESS = process.env.FRONTEND_URL_SUCCESS || 'http://localhost:3000';
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!clientItems || !clientFrete) {
        return NextResponse.json({ error: "Dados do carrinho ou frete ausentes." }, { status: 400 });
    }

    try {
        // 2. VERIFICAÇÃO DE PREÇOS (FONTE CONFIÁVEL)
        const productIds = clientItems.map(item => item.id);
        const productsSnapshot = await db.collection('products').where('id', 'in', productIds).get();
        const officialProducts = {};
        
        // Mapeia os produtos oficiais por ID
        productsSnapshot.forEach(doc => {
            officialProducts[doc.data().id] = doc.data();
        });

        const line_items = [];

        for (const item of clientItems) {
            const officialProduct = officialProducts[item.id];
            
            // 3. VALIDAÇÃO DE INTEGRIDADE
            if (!officialProduct || officialProduct.stock < item.quantity) {
                // Retorna erro se o produto não for encontrado ou se não houver estoque suficiente
                return NextResponse.json({ 
                    error: `Item "${officialProduct?.nome || item.id}" indisponível ou estoque insuficiente.`, 
                }, { status: 400 });
            }

            // Usa o preço OFICIAL do Firebase, NÃO o preço enviado pelo cliente.
            const officialPrice = officialProduct.price; 
            
            line_items.push({
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: officialProduct.nome,
                        images: officialProduct.imgPath ? [officialProduct.imgPath] : [],
                    },
                    unit_amount: Math.round(Number(officialPrice) * 100), // Preço confiável
                },
                quantity: item.quantity,
            });
        }
        
        // 4. TRATAMENTO DE FRETE (Ainda é uma suposição, mas mais seguro)
        // O ideal seria verificar o frete no Melhor Envio novamente, mas vamos usar o valor do cliente.
        // O valor do frete é menos crítico que o do produto, mas idealmente deve ser recalculado.
        line_items.push({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: `Frete - ${clientFrete.nome}`,
                },
                unit_amount: Math.round(Number(clientFrete.preco) * 100),
            },
            quantity: 1,
        });

        // 5. CRIAÇÃO DA SESSÃO STRIPE (Sem mudanças)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'boleto'],
            line_items,
            mode: 'payment',
            success_url: `${FRONTEND_URL_SUCCESS}/success`,
            cancel_url: `${FRONTEND_URL}/carrinho`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error("Erro ao criar sessão do Stripe:", error);
        return NextResponse.json({ 
            error: "Não foi possível iniciar o pagamento.",
            details: error.message,
        }, { status: 500 });
    }
}