import type { StaticImageData } from 'next/image';
import logo from './logo.png';
import heroImage from './hero-image.jpg';


export type logoStore = {
  imgPath: StaticImageData; // 
};

export const logoImg: logoStore = {
  imgPath: logo
};

export type heroPhoto = {
  imgPath: StaticImageData;
};

export const heroimages: heroPhoto = {
  imgPath: heroImage
};

export type headInfoType = {
  id: number;
  text: string;
  imgPath?: StaticImageData; 
};

export const headPhrase: headInfoType[] = [
  { id: 1, text: 'LaClothes' },
  { id: 2, imgPath: heroimages.imgPath, text: 'Renove Seu Estilo' }
]