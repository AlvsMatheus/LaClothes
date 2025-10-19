// src/app/api/calcular-frete/route.js

import axios from "axios";
import { NextResponse } from 'next/server';

// Função que lida com requisições POST
export async function POST(request) {
  // O corpo da requisição é lido de forma assíncrona
  const reqBody = await request.json(); 
  const { cepDestino, quantidade = 1 } = reqBody;

  const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN;
  const MELHOR_ENVIO_EMAIL = process.env.MELHOR_ENVIO_EMAIL;

  if (!cepDestino) {
    return NextResponse.json({ error: "CEP de destino é obrigatório." }, { status: 400 });
  }

  const itemBase = {
    height: 4,
    width: 12,
    length: 17,
    weight: 0.3,
  };

  const body = {
    from: { postal_code: "88032005" },
    to: { postal_code: cepDestino },
    package: {
      height: itemBase.height,
      width: itemBase.width,
      length: itemBase.length,
      weight: itemBase.weight * quantidade,
    },
    services: "1,2", 
  };

  try {
    const response = await axios.post(
      "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
      body,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MELHOR_ENVIO_TOKEN}`,
          'User-Agent': `Aplicação ${MELHOR_ENVIO_EMAIL}`
        }
      }
    );

    const opcoes = response.data
      .filter(opcao => !opcao.error)
      .map(opcao => ({
        id: opcao.id,
        nome: opcao.name,
        preco: opcao.price,
        prazo: opcao.delivery_time,
      }));

    // Usa NextResponse.json para retornar o JSON com status 200
    return NextResponse.json(opcoes); 

  } catch (error) {
    console.error("Erro ao calcular frete:", error.response?.data || error.message);
    return NextResponse.json({ 
      error: "Erro ao calcular frete", 
      detalhes: error.response?.data 
    }, { status: 500 }); // Retorna status 500
  }
}

// Opcional: Para bloquear outros métodos
export async function GET() {
  return NextResponse.json({ error: "Método GET não suportado para esta rota." }, { status: 405 });
}