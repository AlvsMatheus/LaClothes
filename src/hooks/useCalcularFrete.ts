import { useQuery } from "@tanstack/react-query";

interface Frete {
    id: string;
    nome: string;
    preco: string;
    prazo: string
}

interface Params {
    cepDestino: string;
    quantidade: number;
}

async function fetchFrete({ cepDestino, quantidade }: Params): Promise<Frete[]> {
    const res = await fetch("/api/calcular-frete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ cepDestino, quantidade })
    })

    if (!res.ok) {
        const erro = await res.text();
        throw new Error(erro || "Erro ao calcular frete");
    }
    return res.json();
}

export function useCalcularFrete(cepDestino: string, quantidade: number) {
  return useQuery({
    queryKey: ["frete", cepDestino, quantidade],
    queryFn: () => fetchFrete({ cepDestino, quantidade }),
    enabled: !!cepDestino && quantidade > 0,
    staleTime: 1000 * 60 * 5, 
  });
}

