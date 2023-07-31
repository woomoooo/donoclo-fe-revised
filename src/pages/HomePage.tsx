import '../styles/homePage.scss';
import Logo from '../assets/svgs/icon-logo-black.svg';
import NftBackground from '../assets/svgs/home-nft-bg.svg';
import BookBackground from '../assets/svgs/home-book-bg.svg';
import MyPage from '../assets/svgs/icon-mypage.svg';
import Bbom from '../assets/pngs/home-bbom.png';
import Capture from '../assets/svgs/icon-capture.svg';
import {ROUTES} from "../utils/ROUTES";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={'home'}>
      <div className={'home-top'}>
        <img className={'logo'} src={Logo} alt={''}/>
        <img className={'my-page'} src={MyPage} alt={''}
             onClick={() => navigate(ROUTES.MY_PAGE)}/>
      </div>
      <div className={'home-bbom'}
           onClick={() => navigate(ROUTES.INVENTORY)}>
        <img className={'bbom'} src={Bbom} alt={''}/>
        <div className={'capture'}>
          <img className={'capture-icon'} src={Capture} alt={''}/>
        </div>
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