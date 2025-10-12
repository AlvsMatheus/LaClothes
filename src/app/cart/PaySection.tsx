"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCalcularFrete } from "@/hooks/useCalcularFrete";
import { db } from "../config/config-firebase";
import { collection, onSnapshot } from "firebase/firestore";
import icons from "./index";
import ButtonFill from "../components/ButtonFill";
import type { ProductCart } from "./CartItemsType";

interface Frete {
  id: string;
  nome: string;
  preco: string;
  prazo: string;
}

const PaySection = () => {
  const [cep, setCep] = useState<string>("");
  const [freteSelecionado, setFreteSelecionado] = useState<Frete | null>(null);
  const [quantidade, setQuantidade] = useState(0);
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [moto, setmoto] = useState<boolean>(false);
  const [userId] = useState("d2gtOr1BG6TST58WXdTVVfrJDrA3");
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const carrinhoRef = collection(db, "users", userId, "cart");
    const unsubscribe = onSnapshot(carrinhoRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductCart[];
      setCartItems(items);
    });
    return () => unsubscribe(); // Limpa o listener
  }, [userId]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);
    setSubTotal(newSubtotal);
  }, [cartItems]);

  const {
    data: fretes,
    isLoading,
    isError,
    refetch,
  } = useCalcularFrete(cep, cartItems.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length === 8) {
      // Validação simples de CEP
      refetch();
    }
  };

  const handleSelectFrete = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const freteId = e.target.value;
    const freteEscolhido = fretes?.find((f) => f.id.toString() === freteId);
    setFreteSelecionado(freteEscolhido || null);
  };

  // MODIFICADO: Cálculo do valor total, agora mais simples e seguro
  const valorTotal =
    subTotal + (freteSelecionado ? Number(freteSelecionado.preco) : 0);

  // NOVO: Função para iniciar o processo de pagamento
  const handlePayment = async () => {
    if (!freteSelecionado) {
      alert("Por favor, selecione uma opção de frete.");
      return;
    }

    try {
      // Lembre-se de trocar localhost pela URL do seu backend em produção
      const res = await fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          frete: freteSelecionado,
        }),
      });

      if (!res.ok) throw new Error("Falha ao criar sessão de pagamento");

      const { url } = await res.json();
      window.location.href = url; // Redireciona para a página do Stripe
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao tentar ir para o pagamento.");
    }
  };

  return (
    <article className="flex flex-col gap-10 justify-evenly w-full min-h-full px-10 py-10">
      <section className="text-white font-bold text-center text-3xl">
        Resumo do Pedido:
      </section>
      <section className="h-30 w-full flex flex-col justify-center items-start gap-7 text-white font-bold">
        <form
          onSubmit={handleSubmit}
          className="flex border-1 border-blue-500 rounded-3xl h-10"
        >
          <div className="h-full w-full">
            <label htmlFor="ifrete" className="sr-only" />
            <input
              placeholder="Digite seu Cep"
              className="h-full w-full text-black bg-white rounded-l-3xl focus:outline-0 px-3"
              id="ifrete"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onMouseEnter={() => setmoto(true)}
            onMouseLeave={() => setmoto(false)}
            className="flex justify-center items-center group overflow-hidden w-15 h-full bg-blue-400 rounded-r-3xl cursor-pointer"
          >
            <Image
              src={icons.arrow}
              alt="arrow"
              width={20}
              height={20}
              className="group-hover:translate-x-15 transition-all duration-200 ease-in-out"
            />
            {moto && (
              <Image
                src={icons.moto}
                alt="moto gif"
                width={30}
                height={20}
                className="opacity-0 group-hover:opacity-100 me-2 transition-all duration-300 ease-in-out"
              />
            )}
          </button>
        </form>
        {isLoading ? (
          <p className="text-gray-400">Calculando frete...</p>
        ) : isError ? (
          <p className="text-red-400">Erro ao calcular frete</p>
        ) : (
          <select
            className="focus:outline-0 bg-black text-white w-full mt-2"
            onChange={handleSelectFrete}
            value={freteSelecionado?.id || ""}
          >
            <option value="">Selecione o frete</option>
            {fretes?.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome} - R${f.preco} - {f.prazo} dias
              </option>
            ))}
          </select>
        )}
      </section>

      <section className="flex flex-col gap-10 justify-evenly items-center w-full text-white font-bold">
        <div className="w-full flex justify-between">
          <span>Subtotal:</span>
          <span>R$ {subTotal.toFixed(2)}</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Frete:</span>
          <span>
            {freteSelecionado
              ? `R$ ${Number(freteSelecionado.preco).toFixed(2)}`
              : "---"}
          </span>
        </div>
        <div className="w-full flex justify-between text-xl mt-2 border-t pt-2">
          <span>Valor total:</span>
          <span>R$ {valorTotal.toFixed(2)}</span>
        </div>
        <span>
          <ButtonFill
            onClick={handlePayment} 
            label="Ir ao pagamento"
            bg="bg-green-400"
            bgmask="bg-green-500"
            font="bold"
            textColor="white"
            textColorHover="white/90"
          />
        </span>
      </section>
    </article>
  );
};

export default PaySection;
