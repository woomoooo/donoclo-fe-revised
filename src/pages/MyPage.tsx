import React, {useRef, useEffect, useState} from 'react';
import '../styles/myPage.scss';
import LogoWhite from '../assets/svgs/icon-logo.svg';
import LogoBlack from '../assets/svgs/icon-logo-black.svg';
import Bbom from '../assets/pngs/img-mypage-bbom.png';
import Deco1 from '../assets/svgs/icon-mypage-1.svg';
import Credit from "../assets/svgs/icon-credit.svg";
import Deco2 from '../assets/svgs/icon-mypage-2.svg';
import Back from '../assets/svgs/icon-back.svg';
import BackWhite from '../assets/svgs/icon-back-white.svg';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import {requestAvatar } from "../apis/avatar";
import {requestUserInfo} from "../apis/auth";
import Copy from '../assets/svgs/icon-copy.svg';
import {Background} from "../assets/backgrounds/Background";
import Model from "../assets/models/Model";
import {DefaultClothes} from "../assets/defaultClothes/defaultClothes";
import formatTimeStamp from "../common/formatTimeStamp";
import Complete from "../assets/svgs/icon-complete.svg";

const MyPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [avatar, setAvatar] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState('');
  const [background, setBackground] = useState(0);
  const [model, setModel] = useState(0);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [defaultCloth, setDefaultCloth] = useState(-1);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

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

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const avatar = await requestAvatar();
        setAvatar(avatar);
        setName(avatar.name);
      } catch (e) {
        console.log(e);
      }
    }
    getAvatar();
  }, [avatar]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await requestUserInfo();
        setUser(res);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
  }, []);


  const handleScroll = () => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      const scrollPosition = scrollContainer.scrollLeft;
      const pageWidth = scrollContainer.offsetWidth;
      const pageIndex = Math.round(scrollPosition / pageWidth);
      setPage(pageIndex + 1);
    }
  };

  const copyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleCopyText = () => {
      const textToCopy = user.wallet_address;
      copyTextToClipboard(textToCopy);
      handleToast();
  };


  return (
    <div className="scrollable-pages" ref={containerRef}>
      {page === 3 ?
        <img className={'back'} src={Back} alt={''} onClick={() => navigate(ROUTES.HOME)}/> :
        <img className={'back'} src={BackWhite} alt={''} onClick={() => navigate(ROUTES.HOME)}/>
      }
      {page === 3 ?
        <img className={'logo'} src={LogoBlack} alt={''}/> :
        <img className={'logo'} src={LogoWhite} alt={''}/>
      }
      <div className="page">
        <div className={'first-page'}>
          <div className={'home-bbom'}>
            <img className="bbom-background" src={Background({index: background})} alt=""/>
            <img className="bbom" src={Model({color: model})} alt=""/>
            {defaultCloth > -1 && <img className="bbom-default" src={DefaultClothes({index: defaultCloth})} alt=""/>}
            {bottom.length > 0 && <img className="bbom-bottom" src={bottom} alt=""/>}
            {top.length > 0 && <img className="bbom-top" src={top} alt=""/>}
          </div>
          <img className={'deco-vector'} src={Deco1} alt={''}/>
          <div className={'info'}>
            <div className={'label'}> 이름</div>
            <div className={'name'}>
              {avatar.name}
            </div>
          </div>
          <div className={'info'}>
            <div className={'label'}> 생일</div>
            <div className={'birthday'}> {formatTimeStamp(user.registeredDate)} </div>
          </div>
        </div>
      </div>
      <div className="page">
        <div className={'second-page'}>
          <img className={'deco-vector1'} src={Deco2} alt={''}/>
          <img className={'deco-vector2'} src={Deco2} alt={''}/>
          <div className={'info-container'}>
            <div className={'text1'}> total amount of</div>
            <div className={'text2'}> 4.9kg</div>
            <div className={'text3'}>
              지금까지 이 정도의 헌 옷을 기부했어요. <br/>
              앞으로도 도노클로와 함께 <br/>
              헌옷 기부에 참여하고 탄소 배출을 줄여봐요!
            </div>
            <div className={'receipt'}>
              <div className={'left'}>
                <div className={'date'}> 2023.08.01</div>
                <div className={'address'}>
                  대전 유성구 대학로 291 카이스트
                </div>
                <div className={'credit'}>
                  <img className={'credit-icon'} src={Credit} alt={''}/>
                  <div className={'credit-num'}> 12</div>
                </div>
              </div>
              <div className={'right'}>
                <div className={'amount'}> 4.1kg</div>
              </div>
            </div>
            <div className={'receipt'}>
              <div className={'left'}>
                <div className={'date'}> 2023.07.31</div>
                <div className={'address'}>
                  서울특별시 중구 을지로 281
                </div>
                <div className={'credit'}>
                  <img className={'credit-icon'} src={Credit} alt={''}/>
                  <div className={'credit-num'}> 4 </div>
                </div>
              </div>
              <div className={'right'}>
                <div className={'amount'}> 0.8kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page">
        <div className={'third-page'}>
          <img className={'profile-img'} src={Bbom} alt={''}/>
          <div className={'name'}> 유미</div>
          <div className={'info'}>
            <div className={'info-row'}>
              <div className={'label'}> 이메일</div>
              <div className={'value'}> {user.email} </div>
            </div>
            <div className={'info-row'}>
                <div className={'label'}> 지갑 주소 </div>
              <div className={'value address'}>
                <>{user.wallet_address?.substring(0, 8)+ '...'}</>
                <img className={'clone-icon'} onClick={handleCopyText} src={Copy} alt={''}/>
              </div>
            </div>
            <div className={'info-row'}>
              <div className={'label'}> 가입일자</div>
              <div className={'value'}> {formatTimeStamp(user.registeredDate)}</div>
            </div>
          </div>
          <div className={'exit'}> 회원 탈퇴하기</div>
          {showToast ? (
            <div className={'toast'}>
              <img className={'complete-icon'} src={Complete} alt={''}/>
              지갑 주소가 복사되었습니다.
            </div>
          ) : null}
        </div>
      </div>
      <div className={'page-indicator'}>
        <div className={`page-${page}`}></div>
      </div>

    </div>
  );
};


export default MyPage;