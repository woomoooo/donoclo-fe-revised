import React, {useRef, useEffect, useState} from 'react';
import '../styles/myPage.scss';
import LogoWhite from '../assets/svgs/icon-logo.svg';
import LogoBlack from '../assets/svgs/icon-logo-black.svg';
import Bbom from '../assets/pngs/img-mypage-bbom.png';
import Deco1 from '../assets/svgs/icon-mypage-1.svg';
import Credit from "../assets/svgs/icon-credit.svg";
import Edit from "../assets/svgs/icon-edit.svg";
import Deco2 from '../assets/svgs/icon-mypage-2.svg';
import Back from '../assets/svgs/icon-back.svg';
import BackWhite from '../assets/svgs/icon-back-white.svg';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";

const MyPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    // 스크롤 스냅 기능을 위한 설정
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

  const handleScroll = () => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      const scrollPosition = scrollContainer.scrollLeft;
      const pageWidth = scrollContainer.offsetWidth;
      const pageIndex = Math.round(scrollPosition / pageWidth);
      setPage(pageIndex + 1);
    }
  };

  return (
    <div className="scrollable-pages" ref={containerRef}>
      {page === 3 ?
        <img className={'back'} src={Back} alt={''}
             onClick={() => navigate(ROUTES.HOME)}/> :
        <img className={'back'} src={BackWhite} alt={''}
             onClick={() => navigate(ROUTES.HOME)}/>
      }
      {page === 3 ?
        <img className={'logo'} src={LogoBlack} alt={''}/> :
        <img className={'logo'} src={LogoWhite} alt={''}/>
      }
      <div className="page">
        <div className={'first-page'}>
          <div className={'bbom-container'}>
            <img className={'bbom'} src={Bbom} alt={''}/>
            <div className={'credit'}>
              <img className={'credit-icon'} src={Credit} alt={''}/>
              <div className={'credit-num'}> 12</div>
            </div>
          </div>
          <img className={'deco-vector'} src={Deco1} alt={''}/>
          <div className={'info'}>
            <div className={'label'}> 이름</div>
            <div className={'name'}>
              BBOMI
              <img className={'edit'} src={Edit} alt={''}/>
            </div>
          </div>
          <div className={'info'}>
            <div className={'label'}> 생일</div>
            <div className={'birthday'}> 2023.06.29</div>
          </div>
        </div>
      </div>
      <div className="page">
        <div className={'second-page'}>
          <img className={'deco-vector1'} src={Deco2} alt={''}/>
          <img className={'deco-vector2'} src={Deco2} alt={''}/>
          <div className={'info-container'}>
            <div className={'text1'}> total amount of</div>
            <div className={'text2'}> 12.9kg</div>
            <div className={'text3'}>
              여기에 뭐 좀 쓸거 있었으면 좋겠따 <br/>
              절약한 탄소 양?<br/>
              면적으로 하면 얼마나 나올지?<br/>
              뭐 그렇게 보여줄 수 있는거였음 좋겠는디ㅔㅇ
            </div>
            <div className={'receipt'}>
              <div className={'left'}>
                <div className={'date'}> 2023.06.01</div>
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
                <div className={'date'}> 2023.06.01</div>
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
              <div className={'value'}> yumi@studioliq.com</div>
            </div>
            <div className={'info-row'}>
              <div className={'label'}> 전화번호</div>
              <div className={'value'}> oqo-6698-9508</div>
            </div>
            <div className={'info-row'}>
              <div className={'label'}> 가입일자</div>
              <div className={'value'}> 2023.06.29</div>
            </div>
          </div>
          <div className={'exit'}> 회원 탈퇴하기</div>
        </div>
      </div>
      <div className={'page-indicator'}>
        <div className={`page-${page}`}></div>
      </div>

    </div>
  );

};


export default MyPage;