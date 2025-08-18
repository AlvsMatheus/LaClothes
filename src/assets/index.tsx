import type { StaticImageData } from 'next/image';
import logo from './logo.png';
import heroImage from './hero-image.jpg';
import google from './google-logo.png';
import linkedin from './linkedin-logo.png'
import github from './github-logo.png'


export type ImageType = {
  imgPath: StaticImageData; // 
};

export const logoImg: ImageType = {
  imgPath: logo
};

export const logoGoogle: ImageType = {
  imgPath: google
};

export const heroimages: ImageType = {
  imgPath: heroImage
};

export const logoLinkedin: ImageType = {
  imgPath: linkedin
};

export const logoGithub: ImageType = {
  imgPath: github
};

export type headInfoType = {
  id: number;
  text: string;
  imgPath?: StaticImageData; 
};

export const headPhrase: headInfoType[] = [
  { id: 1, text: 'LaClothes' },
  { id: 2, imgPath: heroimages.imgPath, text: 'Renove Seu Estilo' }
];