export interface ProdutosTipos{
  id: string;
  nome: string;
  price: number;
  stock: number;
  imgPath: string;
  category: string;
  emAlta?: boolean;
}

export interface ItemsSectionProps {
  label: string;
  category: string;
}