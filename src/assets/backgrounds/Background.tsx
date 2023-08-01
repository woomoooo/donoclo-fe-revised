import img_0 from "./0.png";
import img_1 from "./1.png";
import img_2 from "./2.png";
import img_3 from "./3.png";
import img_4 from "./4.png";
import img_5 from "./5.png";
import img_6 from "./6.png";
import img_7 from "./7.png";
import img_8 from "./8.png";
import img_9 from "./9.png";
import img_10 from "./10.png";
import img_11 from "./11.png";
import img_12 from "./12.png";
import img_13 from "./13.png";
import img_14 from "./14.png";
import img_15 from "./15.png";
import img_16 from "./16.png";
import img_17 from "./17.png";

interface Props {
  index: number;
}

export const Background = ({index}: Props) => {
  const images = [img_0, img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9,
    img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17];
  return images[index];
}

export const AllBackgrounds =  [img_0, img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9,
    img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17];


