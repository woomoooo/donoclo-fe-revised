import img_1 from "./default_clothes_1.png";
import img_2 from "./default_clothes_2.png";
import img_3 from "./default_clothes_3.png";
import img_4 from "./default_clothes_4.png";
import img_5 from "./default_clothes_5.png";
import img_6 from "./default_clothes_6.png";
import img_7 from "./default_clothes_7.png";

interface Props {
  index: number;
}

export const DefaultClothes = ({index}: Props) => {
  const images = [img_1, img_2, img_3, img_4, img_5, img_6, img_7];
  return images[index];
}

export const AllDefault =  [img_1, img_2, img_3, img_4, img_5, img_6, img_7];


