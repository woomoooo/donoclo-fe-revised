import '../styles/aboutPage.scss';
import Back from '../assets/svgs/icon-back.svg';
import Logo from '../assets/svgs/icon-logo-black.svg';
import AboutImage from '../assets/pngs/about-title.png';
import AboutImage2 from '../assets/pngs/about-ending.png';
import ContentImg1 from '../assets/pngs/about-content-1.png';
import ContentImg2 from '../assets/pngs/about-content-2.png';
import Divider1 from '../assets/svgs/about-divider1.svg';
import Divider2 from '../assets/svgs/about-divider2.svg';
import Capture from '../assets/pngs/about-img-usage1.png';
import ModelInfo from '../assets/pngs/about-model-info.png';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={'about'}>
      <div className={'about-top'}>
        <img className={'back'} src={Back} alt={''} onClick={() => navigate(ROUTES.HOME)}/>
        <img className={'logo'} src={Logo} alt={''}/>
      </div>
      <img className={'about-img1'} src={AboutImage} alt={''}/>
      <div className={'label-title'}> Problems</div>
      <div className={'content'}>
        <div className={'num'}> 1</div>
        <div className={'container'}>
          <img className={'first'} src={ContentImg1} alt={''}/>
          <p className={'content-text'}>
            의류 폐기물 재활용률 <div className={'focus'}> 12% </div> 미만 <br/>
            바다에 버려지는 양 <div className={'focus'}> 800만 </div> 톤
          </p>
        </div>
      </div>
      <div className={'content'}>
        <div className={'num'}> 2 </div>
        <div className={'container'}>
          <p className={'content-text'}>
            2018년 전 세계 <br/>
            의류 폐기물 발생량 중 <br/>
            <div className={'focus'}> 30%가 매립 / 소각</div>
            됨
          </p>
          <img className={'second'} src={ContentImg2} alt={''}/>
        </div>
      </div>
      <div className={'content'}>
        <div className={'num'}> 3 </div>
        <div className={'container-vertical'}>
          <div className={'text'}>
            헌옷의 낮은 재활용률
          </div>
          <div className={'content-circles'}>
            <div className={'circle'}>
              중고거래 등록과 <br/>
              직접 거래의 <br/> 불편함
            </div>
            <div className={'circle main'}>
              동기 부여 <br/>
              부족
            </div>
            <div className={'circle'}>
              헌옷 수거함을 <br/>
              찾기 어려움
            </div>
          </div>
        </div>
      </div>
      <p className={'label-p'}>
        What is
        <img src={Logo} alt={''}/>
        ?
      </p>
      <img className={'about-img2'} src={AboutImage2} alt={''} />
      <div className={'label'}> 집 앞으로 찾아오는 헌옷 수거 <br />
        중고 의류 판매도 함께 해요. </div>
      <div className={'label'}> 헌옷을 재활용하고 <br />
        나만의 아바타에게 새 옷을 선물해요 </div>
      <div className={'label'}> 옷장을 열어볼까요? </div>
      <div className={'how-to'}>
        <div className={'how-to-title'}> How To Use ?</div>
        <p className={'title-1'}>
          <div className={'title-1-1'}> BOOK </div> <br />
          <div className={'title-1-2'}> PICK- </div>
          <div className={'title-1-3'}> UP </div>
        </p>ㄴ
        <img className={'divider'} src={Divider1} alt={''} />
        <div className={'text'}>
          사진을 촬영한 뒤 헌옷 수거를 예약해주세요! <br />
          문 앞에 두시면 자동으로 수거해갈게요.
        </div>
        <img className={'usage'} src={Capture} alt={''} />
        <p className={'title-2'}>
          <div className={'title-2-1'}> create </div>
          <div className={'title-2-2'}> NEW NFT </div>
        </p>
        <img className={'divider'} src={Divider2} alt={''} />
        <div className={'text'}>
          업로드한 의류 사진을 기반으로 NFT를 제작해드려요.  <br />
          제작한 NFT로 나만의 아바타를 꾸며보세요!
        </div>
        <img className={'model-container'} src={ModelInfo} alt={''}/>
      </div>
    </div>
  )
}

export default AboutPage;