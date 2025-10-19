import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
// 🚨 CAMINHO DE IMPORTAÇÃO: Mantenha este caminho se for onde está seu firebaseAdmin.ts
import { db } from "../../../utils/firebaseAdmin"; 

// Interfaces básicas para tipagem
interface ClientItem {
    id: string;
    quantity: number;
    // Opcional: Adicionar outros campos que vêm do carrinho (como price ou nome)
}

interface ClientFrete {
    nome: string;
    preco: number;
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    // Isso deve ser um erro fatal para o servidor
    throw new Error("ERRO FATAL: STRIPE_SECRET_KEY não está definida nas variáveis de ambiente.");
}

const stripe = new Stripe(stripeSecretKey)

// A função POST agora aceita o tipo NextRequest, que vem com o Next.js
export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  // Desestruturação com tipagem
  const { 
    items: clientItems, 
    frete: clientFrete 
  }: { items: ClientItem[]; frete: ClientFrete } = reqBody;

  const FRONTEND_URL_SUCCESS = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
  const FRONTEND_URL = FRONTEND_URL_SUCCESS; // Simplificado

  // 1. Validação de Dados de Entrada
  if (!clientItems || clientItems.length === 0 || !clientFrete) {
    return NextResponse.json(
      { 
          error: "Dados do carrinho ou frete ausentes, ou carrinho vazio.",
          details: "O carrinho deve ter itens e o frete deve ser selecionado."
      },
      { status: 400 }
    );
  }

  try {
    // 2. Busca e Mapeamento dos Produtos Oficiais
    // IDs dos produtos no carrinho (estes são os IDs de documento do Firestore)
    const productIds = clientItems.map((item) => item.id);

    // Busca os produtos oficiais no Firestore pela coleção 'products'
    const productsSnapshot = await db
      .collection("products")
      .where("id", "in", productIds) 
      .get();

    const officialProducts: Record<string, any> = {};

    productsSnapshot.forEach((doc) => {
      // Mapeia pelo ID (o ID que está no carrinho/Firebase)
      const data = doc.data();
      officialProducts[data.id] = data; 
    });
    
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // 3. Montagem dos Itens para o Stripe
    for (const item of clientItems) {
      const officialProduct = officialProducts[item.id];

      // Checagem de segurança (ID do item do carrinho DEVE existir na base de dados)
      if (!officialProduct) {
        return NextResponse.json(
          {
            error: `Item "${item.id}" não encontrado na base de dados.`,
            details: "Verifique se o ID existe na coleção 'products' e se o Firebase Admin está configurado corretamente."
          },
          { status: 400 }
        );
      }
      
      // Checagem de estoque
      if (officialProduct.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Item "${officialProduct.nome || item.id}" indisponível ou estoque insuficiente.`,
            details: `Estoque disponível: ${officialProduct.stock}, Solicitado: ${item.quantity}`
          },
          { status: 400 }
        );
      }

      const officialPrice = officialProduct.price;

      line_items.push({
        price_data: {
          currency: "brl",
          product_data: {
            name: officialProduct.nome,
            // Apenas envia a imagem se o caminho existir
            images: officialProduct.imgPath ? [officialProduct.imgPath] : [],
          },

          // Preço em centavos
          unit_amount: Math.round(Number(officialPrice) * 100),
        },
        quantity: item.quantity,
      });
    }

    // Adiciona o frete
    line_items.push({
      price_data: {
        currency: "brl",
        product_data: {
          name: `Frete - ${clientFrete.nome}`,
        },
        unit_amount: Math.round(Number(clientFrete.preco) * 100),
      },
      quantity: 1,
    });

    // 4. Criação da Sessão do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      line_items,
      mode: "payment",
      success_url: `${FRONTEND_URL_SUCCESS}/success`,
      cancel_url: `${FRONTEND_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erro ao criar sessão do Stripe:", error);
    return NextResponse.json(
      {
        error: "Não foi possível iniciar o pagamento. Verifique o console do servidor.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
