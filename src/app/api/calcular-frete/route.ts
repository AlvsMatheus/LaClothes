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
    preco: string; 
    prazo: number;
}

// 🚨 CORREÇÃO: Interface para a resposta da API do Melhor Envio
interface MelhorEnvioOption {
  id: number;
  name: string;
  price: string;
  delivery_time: number;
  error?: string; // Campo de erro que a API pode retornar
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
    // 🚨 CORREÇÃO: Tipagem de 'data'
    const data: MelhorEnvioOption[] = response.data;

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

  // 🚨 CORREÇÃO: Tipagem do 'catch'
  } catch (error: unknown) {
    let errorMessage = "Erro ao calcular frete";
    let errorDetails: unknown = undefined;

    // Extrai detalhes se for um erro do Axios
    if (axios.isAxiosError(error)) {
        errorMessage = error.message;
        errorDetails = error.response?.data;
        console.error("Erro ao calcular frete (Axios):", errorDetails || errorMessage);
    } else if (error instanceof Error) {
        errorMessage = error.message;
        console.error("Erro ao calcular frete (Geral):", error);
    } else {
        console.error("Erro desconhecido ao calcular frete:", error);
    }

    return NextResponse.json({ 
      error: errorMessage, 
      detalhes: errorDetails 
    }, { status: 500 }); // Retorna status 500
  }
}

// Opcional: Para bloquear outros métodos
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Método GET não suportado para esta rota." }, { status: 405 });
}