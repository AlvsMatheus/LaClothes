import arrow from "@/assets/white-arrow.png";
import moto from "@/assets/moto.gif"
import { StaticImageData } from "next/image";

interface ImageType {
  arrow: StaticImageData
  moto: StaticImageData
}

const icons: ImageType = {
  arrow,
  moto
};

export default icons;
