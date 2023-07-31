import '../styles/createNftPage.scss';
import Credit from '../assets/svgs/icon-credit.svg'
import Camera from '../assets/svgs/icon-camera.svg';
import Gallery from '../assets/svgs/icon-gallery.svg';
import Deco1 from '../assets/svgs/create-deco1.svg';
import Deco2 from '../assets/svgs/create-deco2.svg';
import Model from '../assets/pngs/model-dummy.png';

const CreateNftPage = () => {
  return (
    <div>
      <div className={'create'}>
        <div className={'create-title'}>
          <div className={'title-create'}> create</div>
          <div className={'title-nft'}> NEW NFT</div>
        </div>

        <div className={'masked-div'}>
          <div className={'nft-container'}>
            <div className={'credit'}>
              <img className={'credit-icon'} src={Credit} alt={''}/>
              <div className={'credit-num'}> 12</div>
            </div>
            <div className={'upload-menu'}>
              <img className={'camera'} src={Camera} alt={''}/>
              <img className={'gallery'} src={Gallery} alt={''}/>
            </div>
            <div className={'upload-container'}>
              <div className={'upload'}>
                upload a picture of the clothes <br/> you want to make in nft
              </div>
              <div className={'after-uploaded'}>
                <div className={'generated-message'}> Your NFT <br/> Generated !</div>
                <img className={'deco1'} src={Deco1} alt={''}/>
                <img className={'deco2'} src={Deco2} alt={''}/>

                <div className={'model'}>
                  <img className={'model-blur'} src={Model} alt={''}/>
                  <div className={'model-container'}/>
                  <img className={'model-bbom'} src={Model} alt={''}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNftPage;