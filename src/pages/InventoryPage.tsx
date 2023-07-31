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

const InventoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className={'inventory'}>
      <div className={'inventory-top'}>
        <img className={'back'} src={Back} alt={''}
        onClick={() => navigate(ROUTES.HOME)}/>
        <div className={'bbom-name'}>
          <div className={'bbom-name-text'}> BBOM</div>
          <img className={'edit'} src={Edit} alt={''}/>
        </div>
        <div className={'save'}> 저장</div>
      </div>
      <div className={'bbom-container'}>
        <img className={'bbom'} src={Bbom} alt={''}/>
        <div className={'capture'}>
          <img className={'capture-icon'} src={Capture} alt={''}/>
        </div>
      </div>
      <div className={'inventory-filter'}>
        <div className={'all'}> ALL</div>
        <BackgroundIcon fill={"#dcdcdc"}/>
        <HariIcon fill={"#dcdcdc"}/>
        <TopIcon fill={"#dcdcdc"}/>
        <PantsIcon fill={"#dcdcdc"}/>
        <SkirtIcon fill={"#dcdcdc"}/>
      </div>
    </div>
  )
}
export default InventoryPage;