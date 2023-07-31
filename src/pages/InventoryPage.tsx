import '../styles/inventoryPage.scss';
import Back from '../assets/svgs/icon-back.svg';
import Edit from '../assets/svgs/icon-edit.svg';
import Bbom from "../assets/pngs/home-bbom.png";
import Capture from "../assets/svgs/icon-capture.svg";
import BackgroundIcon from "../assets/BackgroundIcon";
import PantsIcon from "../assets/PantsIcon";
import SkirtIcon from "../assets/SkirtIcon";
import TopIcon from "../assets/TopIcon";
import HariIcon from "../assets/HairIcon";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import {useRef} from "react";
import html2canvas from 'html2canvas';

const InventoryPage = () => {
  const navigate = useNavigate();
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCaptureClick = async () => {
    if (captureRef.current) {
      const captureElement = captureRef.current;
      const containerWidth = captureElement.offsetWidth;
      const containerHeight = captureElement.offsetHeight - 32;

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
        link.download = 'screenshot.png';
        link.click();
      } catch (error) {
        console.error('Failed to capture image:', error);
      }
    }
  };

  return (
    <div className="inventory">
      <div className="inventory-top">
        <img className="back" src={Back} alt="" onClick={() => navigate(ROUTES.HOME)} />
        <div className="bbom-name">
          <div className="bbom-name-text">BBOM</div>
          <img className="edit" src={Edit} alt="" />
        </div>
        <div className="save">저장</div>
      </div>
      <div className="bbom-container" ref={captureRef}>
        <img className="bbom" src={Bbom} alt="" />
      </div>
      <div className="capture" onClick={handleCaptureClick}>
        <img className="capture-icon" src={Capture} alt="" />
      </div>
      <div className="inventory-filter">
        <div className="all">ALL</div>
        <BackgroundIcon fill="#dcdcdc" />
        <HariIcon fill="#dcdcdc" />
        <TopIcon fill="#dcdcdc" />
        <PantsIcon fill="#dcdcdc" />
        <SkirtIcon fill="#dcdcdc" />
      </div>
    </div>
  );
}
export default InventoryPage;