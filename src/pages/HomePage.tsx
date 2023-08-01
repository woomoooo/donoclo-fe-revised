import '../styles/homePage.scss';
import Logo from '../assets/svgs/icon-logo-black.svg';
import NftBackground from '../assets/svgs/home-nft-bg.svg';
import BookBackground from '../assets/svgs/home-book-bg.svg';
import MyPage from '../assets/svgs/icon-mypage.svg';
import {ROUTES} from "../utils/ROUTES";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {requestAvatar} from "../apis/avatar";
import {Background} from "../assets/backgrounds/Background";
import Model from "../assets/models/Model";
import {DefaultClothes} from "../assets/defaultClothes/defaultClothes";

const HomePage = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState(0);
  const [model, setModel] = useState(0);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [defaultCloth, setDefaultCloth] = useState(-1);
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
        setDefaultCloth(avatar.one_piece);
      } catch (e) {
        console.log(e);
      }
    }
    getAvatar();
  }, []);


  return (
    <div className={'home'}>
      <div className={'home-top'}>
        <img className={'logo'} src={Logo} alt={''}/>
        <img className={'my-page'} src={MyPage} alt={''}
             onClick={() => navigate(ROUTES.MY_PAGE)}/>
      </div>

      <div className={'home-bbom'} ref={captureRef}
           onClick={() => navigate(ROUTES.INVENTORY)}>
        <img className="bbom-background" src={Background({index: background})} alt=""/>
        <img className="bbom" src={Model({color: model})} alt=""/>
        {defaultCloth>-1 && <img className="bbom-default" src={DefaultClothes({index: defaultCloth})} alt=""/>}
        {bottom.length > 0 && <img className="bbom-bottom" src={bottom} alt=""/>}
        {top.length > 0 && <img className="bbom-top" src={top} alt=""/>}
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