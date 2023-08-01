import '../styles/homePage.scss';
import Logo from '../assets/svgs/icon-logo-black.svg';
import NftBackground from '../assets/svgs/home-nft-bg.svg';
import BookBackground from '../assets/svgs/home-book-bg.svg';
import MyPage from '../assets/svgs/icon-mypage.svg';
import Capture from '../assets/svgs/icon-capture.svg';
import {ROUTES} from "../utils/ROUTES";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {requestAvatar} from "../apis/avatar";
import html2canvas from "html2canvas";
import {Background} from "../assets/backgrounds/Background";
import Model from "../assets/models/Model";

const HomePage = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState(0);
  const [model, setModel] = useState(0);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [one_piece, setOnePiece] = useState(0);
  const [name, setName] = useState('');
  const captureRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const getAvatar = async () => {
      try {
        const avatar = await requestAvatar();
        setBackground(avatar.background);
        setModel(avatar.hair);
        setName(avatar.name);
        setTop(avatar.top);
        setBottom(avatar.bottom);
        setOnePiece(avatar.one_piece);
      } catch (e) {
        console.log(e);
      }
    }
    getAvatar();
  }, []);

  const handleCaptureClick = async () => {
    if (captureRef.current) {
      const captureElement = captureRef.current;
      const containerWidth = captureElement.offsetWidth; // 캡처할 영역의 너비
      const containerHeight = captureElement.offsetHeight - 32; // 캡처할 영역의 높이

      const captureOptions = {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        useCORS: true,
        width: containerWidth,
        height: containerHeight,
      };

      try {
        const canvas = await html2canvas(captureElement, captureOptions);

        const excludedElement = captureElement.querySelector('.capture');
        if (excludedElement) {
          const excludedElementRect = excludedElement.getBoundingClientRect();
          const {top, left, width, height} = excludedElementRect;
          const context = canvas.getContext('2d');
          if (context) {
            context.clearRect(left, top, width, height);
          }
        }

        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = `${name}.png`;
        link.click();
      } catch (error) {
        console.error('Failed to capture image:', error);
      }
    }
  };

  return (
    <div className={'home'}>
      <div className={'home-top'}>
        <img className={'logo'} src={Logo} alt={''}/>
        <img className={'my-page'} src={MyPage} alt={''}
             onClick={() => navigate(ROUTES.MY_PAGE)}/>
      </div>

      <div className={'home-bbom'}
           onClick={() => navigate(ROUTES.INVENTORY)}>
        <img className="bbom-background" src={Background({index: background})} alt=""/>
        <img className="bbom" src={Model({color: model})} alt=""/>
      </div>
      <div className={'capture'} onClick={handleCaptureClick}>
        <img className={'capture-icon'} src={Capture} alt={''}/>
      </div>
      <div className={'home-menu'}>
        <div className={'menu-card'}
             onClick={() => navigate(ROUTES.CREATE)}>
          <img className={'nft-bg'} src={NftBackground} alt={''}/>
        </div>
        <div className={'menu-card'}
             onClick={() => navigate(ROUTES.BOOK)}>
          <img className={'book-bg'} src={BookBackground} alt={''}/>
        </div>
      </div>
      <div className={'about'} onClick={() => navigate(ROUTES.ABOUT)}> HOW TO USE ?</div>
    </div>
  )
}

export default HomePage;