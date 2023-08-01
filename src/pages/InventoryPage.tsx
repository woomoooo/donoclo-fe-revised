import '../styles/inventoryPage.scss';
import Back from '../assets/svgs/icon-back.svg';
import Edit from '../assets/svgs/icon-edit.svg';
import Capture from "../assets/svgs/icon-capture.svg";
import BackgroundIcon from "../assets/BackgroundIcon";
import PantsIcon from "../assets/PantsIcon";
import DefaultIcon from "../assets/DefaultIcon";
import TopIcon from "../assets/TopIcon";
import HariIcon from "../assets/HairIcon";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import React, {useEffect, useRef, useState} from "react";
import html2canvas from 'html2canvas';
import {requestAvatar, requestAvatarUpdate} from "../apis/avatar";
import Complete from '../assets/svgs/icon-complete.svg';
import {AllBackgrounds, Background} from "../assets/backgrounds/Background";
import Model from "../assets/models/Model";
import {requestBottomImage, requestTopImage} from "../apis/clothes";
import {AllDefault, DefaultClothes} from "../assets/defaultClothes/defaultClothes";
import {Hearts} from "react-loader-spinner";

const InventoryPage = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('bbom');
  const navigate = useNavigate();
  const [model, setModel] = useState(-1);
  const [background, setBackground] = useState(-1);
  const [defaultCloth, setDefaultCloth] = useState(-1);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const captureRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const hairColor = ['#000000', '#8F5F51', '#F0E5CC', '#F2EE7B', '#E69653', '#EF244B', '#F5B5B9', '#F7A3D5', '#77EBFB', '#E2F6B8'];
  const [isEditMode, setIsEditMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [topList, setTopList] = useState([]);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [bottomList, setBottomList] = useState([]);
  const [isBottomLoading, setIsBottomLoading] = useState(false);

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    window.location.reload();
  };

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const avatar = await requestAvatar();
        if (avatar) {
          setAvatar(avatar);
          setName(avatar.name);
          setBackground(avatar.background);
          setModel(avatar.hair);
          setTop(avatar.top);
          setBottom(avatar.bottom);
          setDefaultCloth(avatar.one_piece);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getAvatar();
  }, []);

  const loadTop = async () => {
    setIsTopLoading(true)
    try{
      const topList = await requestTopImage();
      setTopList(topList);
    } catch (e) {
      console.log(e);
    }
    setIsTopLoading(false);
  }
  const loadBottom = async () => {
    setIsBottomLoading(true)
    try{
      const bottomList = await requestBottomImage();
      setBottomList(bottomList);
    } catch (e) {
      console.log(e);
    }
    setIsBottomLoading(false);
  }
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleUpdateAvatar = async () => {
    try {
      await requestAvatarUpdate({
        name: name,
        background: background,
        hair: model,
        top: top,
        bottom: bottom,
        one_piece: defaultCloth,
      });
      handleToast();
    } catch (e) {
      console.log(e);
    }
  }
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


  const handleModelClick = (index: number) => {
    setModel(index);
  }

  const handleBackgroundClick = (index: number) => {
    setBackground(index);
  }

  const handleDefaultClothesClick = (index: number) => {
    setDefaultCloth(index);
    setTop('');
    setBottom('');
  }

  const handleTopClick = (url: string) => {
    setTop(url);
    setDefaultCloth(-1);
  }

  const handleBottomClick = (url: string) => {
    setBottom(url);
    setDefaultCloth(-1);
  }


  return (
    <div className="inventory">
      <div className="inventory-top">
        <img className="back" src={Back} alt="" onClick={() => navigate(ROUTES.HOME)}/>
        {isEditMode ? (
          <div className={'bbom-name-edit'}>
            <input className="bbom-name-input" value={name} onChange={(e) => setName(e.target.value)}/>
            <img className={'complete'} src={Complete} alt={''} onClick={() => setIsEditMode(false)}/>
          </div>
        ) : (
          <div className="bbom-name" onClick={() => setIsEditMode(true)}>
            <div className="bbom-name-text"> {name} </div>
            <img className="edit" src={Edit} alt=""/>
          </div>
        )}
        <div className="save" onClick={handleUpdateAvatar}>저장</div>
      </div>
      <div className="bbom-container" ref={captureRef}>
        <img className="bbom-background" src={Background({index: background})} alt=""/>
        <img className="bbom" src={Model({color: model})} alt=""/>
        {defaultCloth>-1 && (<img className="bbom-default-clothes" src={DefaultClothes({index: defaultCloth})} alt=""/>)}
        {bottom.length > 0 && ( <img className="bbom-default-clothes" src={bottom} alt=""/>)}
        {top.length > 0 && ( <img className="bbom-default-clothes" src={top} alt=""/>)}
      </div>
      <div className="capture" onClick={handleCaptureClick}>
        <img className="capture-icon" src={Capture} alt=""/>
      </div>
      <div className="inventory-filter">
        <div className={`filter-icon ${selectedFilter === 'background' && 'selected'}`}
             onClick={() => handleFilterClick('background')}>
          <BackgroundIcon fill={selectedFilter === 'background' ? 'black' : '#dcdcdc'}/>
        </div>
        <div className={`filter-icon ${selectedFilter === 'hair' && 'selected'}`}
             onClick={() => handleFilterClick('hair')}>
          <HariIcon fill={selectedFilter === 'hair' ? 'black' : '#dcdcdc'}/>
        </div>
        <div className={`filter-icon ${selectedFilter === 'top' && 'selected'}`}
             onClick={() => {
               loadTop();
               handleFilterClick('top');
             }}>
          <TopIcon fill={selectedFilter === 'top' ? 'black' : '#dcdcdc'}/>
        </div>
        <div className={`filter-icon ${selectedFilter === 'bottom' && 'selected'}`}
             onClick={() => {
               loadBottom();
               handleFilterClick('bottom');
             }}>
          <PantsIcon fill={selectedFilter === 'bottom' ? 'black' : '#dcdcdc'}/>
        </div>
        <div className={`filter-icon ${selectedFilter === 'defaultClothes' && 'selected'}`}
             onClick={() => handleFilterClick('defaultClothes')}>
          <DefaultIcon fill={selectedFilter === 'defaultClothes' ? 'black' : '#dcdcdc'}/>
        </div>
      </div>
      {showToast ? (
        <div className={'toast'}>
          <img className={'complete-icon'} src={Complete} alt={''}/>
          변경 사항이 저장되었습니다!
        </div>
      ) : null}
      {selectedFilter === 'hair' ? (
        <div className={'hair-picker'}>
          {hairColor.map((color, index) => (
            <div className={`hair-color ${model === index && 'selected'}`} style={{backgroundColor: color}}
                 onClick={() => handleModelClick(index)}/>
          ))}
        </div>
      ) : null}
      {selectedFilter === 'background' ? (
        <div className={'background-picker'}>
          {AllBackgrounds.map((bg, index) => (
            <img className={`background ${background === index && 'selected'}`} src={bg} alt={''}
                 onClick={() => handleBackgroundClick(index)}/>
          ))}
        </div>
      ) : null}
      {selectedFilter === 'defaultClothes' ? (
        <div className={'clothes-picker'}>
          {AllDefault.map((defaultClothes, index) => (
            <img className={`default ${defaultCloth === index && 'selected'}`} src={defaultClothes} alt={''}
                 onClick={() => handleDefaultClothesClick(index)}/>
          ))}
        </div>
      ) : null}
      {selectedFilter === 'top' ? (
        <div className={'clothes-picker'}>
          {isTopLoading ? <>
              {/* eslint-disable-next-line react/jsx-no-undef */}
            <div className={'loading-container'}>
              <Hearts
                height="80"
                width="80"
                color="#000000"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
            </>
            : <>
              {topList.map((top, index) => (
                <img className={`default ${top === index && 'selected'}`} src={top} alt={''}
                     onClick={() => handleTopClick(top)}/>
              ))}</>}

        </div>
      ) : null}
      {selectedFilter === 'bottom' ? (
        <div className={'clothes-picker'}>
          {isBottomLoading ? <>
            <div className={'loading-container'}>
              <Hearts
                height="80"
                width="80"
                color="#000000"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
            </>
            : <>
              {bottomList.map((bottom, index) => (
                <img className={`default ${bottom === index && 'selected'}`} src={bottom} alt={''}
                     onClick={() => handleBottomClick(bottom)}/>
              ))}</>}
        </div>
      ) : null}
    </div>
  );
};

export default InventoryPage;
