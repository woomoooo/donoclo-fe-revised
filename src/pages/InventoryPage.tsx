import '../styles/inventoryPage.scss';
import Back from '../assets/svgs/icon-back.svg';
import Edit from '../assets/svgs/icon-edit.svg';
import Bbom from "../assets/pngs/img-home-bbom.png";
import Capture from "../assets/svgs/icon-capture.svg";

const InventoryPage = () => {
  return (
    <div className={'inventory'}>
      <div className={'inventory-top'}>
        <img className={'back'} src={Back} alt={''} />
        <div className={'bbom-name'}>
          <div className={'bbom-name-text'}> BBOM </div>
          <img className={'edit'} src={Edit} alt={''} />
        </div>
        <div className={'save'}> 저장 </div>
      </div>
      <div className={'bbom-container'}>
        <img className={'bbom'} src={Bbom} alt={''}/>
        <div className={'capture'}>
          <img className={'capture-icon'} src={Capture} alt={''}/>
        </div>
      </div>
      <div className={'inventory-filter'}>
        <div className={'all'}> ALL </div>
      </div>
    </div>
  )
}

export default InventoryPage;