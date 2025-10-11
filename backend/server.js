import express from "express"
import cors from "cors";
import axios from "axios";
import 'dotenv/config'; 
import Stripe from "stripe";

const app = express();

app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.get("/", (_req, res) => {
  res.send("Servidor funcionando ✅");
});

app.post("/calcular-frete", async (req, res) => {
  
  const { cepDestino, quantidade = 1 } = req.body;

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
  };

  try {
    const response = await axios.post(
      "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
      body, 
      {
        headers: {
          
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        
          'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
        
          'User-Agent': `Aplicação ${process.env.MELHOR_ENVIO_EMAIL}`
        }
      }
    );

    
    const opcoes = response.data.map(opcao => ({
      id: opcao.id,
      nome: opcao.name,
      preco: opcao.price,
      prazo: opcao.delivery_time,
    }));

    res.json(opcoes);
  } catch (error) {
    console.error("Erro ao calcular frete:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao calcular frete", detalhes: error.response?.data, });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const { items, frete } = req.body;

  if (!items || !frete) {
    return res.status(400).json({ error: "Dados do carrinho ou frete ausentes." });
  }

  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.nome,
          images: [item.imgPath], // Opcional, mas melhora a experiência
        },
        unit_amount: Math.round(Number(item.price) * 100), // Preço em centavos
      },
      quantity: item.quantity,
    }));

    // Adiciona o frete como um item separado
    line_items.push({
      price_data: {
        currency: 'brl',
        product_data: {
          name: `Frete - ${frete.nome}`,
        },
        unit_amount: Math.round(Number(frete.preco) * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/sucesso`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/carrinho`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Erro ao criar sessão do Stripe:", error);
    res.status(500).json({ error: "Não foi possível iniciar o pagamento." });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`));