
import black from './black.png';
import brown from './brown.png';
import lightyellow from './lightyellow.png';
import yellow from './yellow.png';
import orange from './orange.png';
import red from './red.png';
import scarlet from './scarlet.png';
import pink from './pink.png';
import skyblue from './skyblue.png';
import lightgreen from './lightgreen.png';

interface Props {
  color: number;
}
const Model = ({color}: Props) => {
  const images = [black, brown, lightyellow, yellow, orange, red, scarlet, pink, skyblue, lightgreen];
  return images[color];
}

export default Model;