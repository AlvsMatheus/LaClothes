import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';

// Interface para tipar o corpo da requisição POST
interface RequestBody {
    cepDestino: string;
    quantidade: number;
}

// Interface para a resposta filtrada do Melhor Envio
interface FreteOption {
    id: number;
    nome: string;
    preco: string; // Preço vem como string da API, mantendo para precisão
    prazo: number;
}

// Função que lida com requisições POST
export async function POST(request: NextRequest): Promise<NextResponse> {
  // O corpo da requisição é lido de forma assíncrona
  const reqBody: RequestBody = await request.json(); 
  
  // Desestruturação com valores padrão
  const { cepDestino, quantidade = 1 } = reqBody;

  const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN;
  const MELHOR_ENVIO_EMAIL = process.env.MELHOR_ENVIO_EMAIL;

  if (!cepDestino) {
    return NextResponse.json({ error: "CEP de destino é obrigatório." }, { status: 400 });
  }
  
  // Validação básica dos tokens de ambiente
  if (!MELHOR_ENVIO_TOKEN || !MELHOR_ENVIO_EMAIL) {
    console.error("ERRO: Tokens do Melhor Envio não configurados.");
    return NextResponse.json(
        { error: "Erro de configuração do servidor. Tokens do Melhor Envio ausentes." }, 
        { status: 500 }
    );
  }

  // As dimensões do item devem ser consistentes com o produto padrão.
  const itemBase = {
    height: 4,
    width: 12,
    length: 17,
    weight: 0.3,
  };

  const body = {
    from: { postal_code: "88032005" }, // CEP de origem fixo
    to: { postal_code: cepDestino },
    package: {
      height: itemBase.height,
      width: itemBase.width,
      length: itemBase.length,
      weight: itemBase.weight * quantidade, // Peso total baseado na quantidade
    },
    services: "1,2", // IDs de serviços (e.g., PAC e Sedex)
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

    // O response.data pode ser um array de opções ou um objeto de erro
    const data: any[] = response.data;

    const opcoes: FreteOption[] = data
      .filter(opcao => !opcao.error) // Filtra apenas opções válidas (sem erro)
      .map(opcao => ({
        id: opcao.id,
        nome: opcao.name,
        preco: opcao.price,
        prazo: opcao.delivery_time,
      }));

    // Usa NextResponse.json para retornar o JSON com status 200
    return NextResponse.json(opcoes); 

  } catch (error: any) {
    console.error("Erro ao calcular frete:", error.response?.data || error.message);
    return NextResponse.json({ 
      error: "Erro ao calcular frete", 
      detalhes: error.response?.data 
    }, { status: 500 }); // Retorna status 500
  }
}

// Opcional: Para bloquear outros métodos
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Método GET não suportado para esta rota." }, { status: 405 });
}
