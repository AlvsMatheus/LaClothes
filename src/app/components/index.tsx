import { ReactNode } from "react";
import { StaticImageData } from "next/image";


export interface NavMessage {
  text: ReactNode;
}

export interface Info {
  id: number;
  name: string;
  links: string[];
}

export interface ProductType {
  imgPath: string | StaticImageData ;
  name?: string;
  price?: number;
}

export const navmessages: NavMessage[] = [
  {text: <><span><strong className="navmessage">Compre Agora!!!</strong></span></>},
  {text: <><span>Aproveite nossas <strong className="navmessage">ofertas!!!</strong></span></>},
  {text: <><span><strong className="navmessage">Frete grátis </strong> para todo o Brasil</span></>},
  {text: <><span><strong className="navmessage">CUPOM: LACLOTHES10</strong> na primeira compra</span></>},
]

export const headInfo: Info[] = [
  {id: 1, name: "Coleção", links: ["nova coleção", "coleção mais procurada"] },
  {id: 2, name: "Roupas", links: ["camisetas", "regatas", "calças", "casacos" ] },
  {id: 3, name: "Acessórios", links: ["bonés", "toucas", "óculos", "garrafas", "pulseiras", "brincos"] },
  {id: 4, name: "Calçados", links: ["tênis", "sandálias", "meias"] },
  {id: 5, name: "Promoções", links: ["descontos", "ofertas relâmpago"] },
]



