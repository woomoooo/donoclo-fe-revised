import "../styles/splashPage.scss";
import LogoIcon from '../assets/svgs/icon-logo.svg';
import Bbom from '../assets/pngs/img-splash-bbom.png';
import Content from '../assets/svgs/icon-splash-content.svg';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
const SplashPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className={'splash'}>
        <img className={'logo'} src={LogoIcon} alt={''} />
        <img className={'bbom'} src={Bbom} alt={''} />
        <img className={'splash-content'} src={Content} alt={''} />
      </div>
    )
  } else {
    return (
      <div className={'splash'}>
        <img className={'logo'} src={LogoIcon} alt={''} />
        <img className={'bbom'} src={Bbom} alt={''} />
        <div className={'signin'}
             onClick={() => {navigate(ROUTES.SIGN_IN)}}> 로그인하기 </div>
        <div className={'signup'}>
          <> Don't have an account? </>
          <div className={'clickable'}
               onClick={() => {navigate(ROUTES.SIGN_UP)}}> Sign Up </div>
        </div>
      </div>
    )
  }

}

export default SplashPage;