import { ReactNode } from "react";
import { StaticImageData } from "next/image";
import tshirt1 from '../../assets/tshirt-1.jpg';
import tshirt2 from '../../assets/tshirt-2.jpg';
import tshirt3 from '../../assets/tshirt-3.jpg';
import calca1 from '../../assets/calca1.webp';
import calca2 from '../../assets/calca2.webp';
import calca3 from '../../assets/calca3.webp';
import bone1 from '../../assets/bone1.webp';
import bone2 from '../../assets/bone2.webp';
import bone3 from '../../assets/bone3.webp';
import pulseira1 from '../../assets/pulseira1.webp';
import pulseira2 from '../../assets/pulseira2.jpg';
import pulseira4 from '../../assets/pulseira4.jpg';
import shoes1 from '../../assets/shoes1.jpg'
import shoes2 from '../../assets/shoes2.jpg'
import shoes3 from '../../assets/shoes3.jpg'
import shoes4 from '../../assets/shoes4.jpg'
import shoes5 from '../../assets/shoes5.jpg'
import shoes6 from '../../assets/shoes6.jpg'
import promotion1 from '../../assets/promotion1.jpg';
import promotion2 from '../../assets/promotion2.webp';
import promotion3 from '../../assets/promotion3.jpg';



export interface NavMessage {
  text: ReactNode;
}

export interface Info {
  id: number;
  name: string;
  links: string[];
}

export interface ProductType {
  imgPath?: string | StaticImageData | any;
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

export const products: Record<string, ProductType[]> = {
  emAlta: [
    { imgPath: bone1, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: pulseira1, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: bone2, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: pulseira2, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: bone3, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: pulseira4, name: 'CALÇA CARGO VERDE', price: 239.90 },
  ],
  roupas: [
    { imgPath: tshirt1, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: calca1, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: tshirt2, name: 'CAMISETA BÁSICA CARRANCA ORIENTAL', price: 169.90 },
    { imgPath: calca2, name: 'CALÇA CARGO PRETA', price: 289.90 },
    { imgPath: tshirt3, name: 'CAMISA OVERSIZED SKATISTA', price: 189.90 },
    { imgPath: calca3, name: 'CALÇA CARGO BEGE', price: 199.90 },
  ],
  acessorios: [
    { imgPath: bone1, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: pulseira1, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: bone2, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: pulseira2, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: bone3, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: pulseira4, name: 'CALÇA CARGO VERDE', price: 239.90 },
  ],
  calcados: [
    { imgPath: shoes1, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: shoes2, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: shoes3, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: shoes4, name: 'CALÇA CARGO VERDE', price: 239.90 },
    { imgPath: shoes5, name: 'CAMISETA BÁSICA COOL STREET ART', price: 149.90 },
    { imgPath: shoes6, name: 'CALÇA CARGO VERDE', price: 239.90 },
  ],
  promocoes: [
    { imgPath: promotion1, name: 'Oferta 1', price: 89.90 },
    { imgPath: promotion2, name: 'Desconto 2', price: 109.90 },
    { imgPath: promotion3, name: 'Desconto 2', price: 109.90 },
  ]
}


