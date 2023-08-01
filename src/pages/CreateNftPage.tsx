import '../styles/createNftPage.scss';
import Credit from '../assets/svgs/icon-credit.svg'
import Camera from '../assets/svgs/icon-camera.svg';
import Gallery from '../assets/svgs/icon-gallery.svg';
import Deco1 from '../assets/svgs/create-deco1.svg';
import Deco2 from '../assets/svgs/create-deco2.svg';
import Box from '../assets/pngs/create-box.png';
import Back from "../assets/svgs/icon-back.svg";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import {GET_DESCRIPTION, MINT_NFT} from "../apis/url";
import axios from "axios";
import {Hearts} from "react-loader-spinner";
import localStorage from "../utils/LocalStorage";

const CreateNftPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>(null as unknown as File);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string>('');
  const [isMinting, setIsMinting] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const generateDescription = async () => {
    setIsLoading(true);
    if(!file){
      return
    }
    try{
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post(GET_DESCRIPTION, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setGeneratedImg(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  }

  const mintNFT = async () => {
    setIsMinting(true);
    try{
      const body = { img: generatedImg };
      const token = localStorage.getItem("token");
      const headers = {
        "ACCESS_TOKEN": token
      };
      await axios.post(MINT_NFT, body, {headers});
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  }

  const resetButton = () => {
    setFile(null as unknown as File);
    setPreviewURL(null);
    setGeneratedImg('');
    setIsLoading(false);
  }

  return (
    <div>
      <div className={'create'}>
        <img className={'back'} src={Back} alt={''} onClick={() => navigate(ROUTES.HOME)}/> :
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
              <label htmlFor="custom-input" className={'gallery-input'}>
                <input type="file" onChange={handleFileChange} accept="image/*" id="custom-input" className={'custom-input'} />
                <img src={Gallery} alt="Custom Icon" className={'custom-icon'} />
              </label>
            </div>
            <div className={'upload-container'}>
              {previewURL ? <>
                <div className={'upload'}>
                  <img
                    src={previewURL || ''}
                    alt="Preview"
                    style={{ width : '100%', height : '100%', borderRadius:'8px', objectFit:'cover'}}
                  />
                </div>
              </> :<>
                <div className={'upload'}>
                  upload a picture of the clothes <br/> you want to make in nft
                </div>
              </>}

              <div className={'after-uploaded'}>
                <div className={'after-uploaded-status'}>
                  {isLoading ?<Hearts
                      height="80"
                      width="80"
                      color="#ffffff"
                      ariaLabel="hearts-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                    : <>
                      { generatedImg.length === 0 ? <>
                          {previewURL ? <><button onClick={generateDescription} className={'generate-button'}>Generate NFT</button></>
                            : <></>}
                        </>
                        : <>
                          <div className={'generated-message'}> Your NFT <br/> Generated !</div>
                          <button onClick={mintNFT} className={'mint-button'}>Mint NFT</button>
                        </>
                      }
                    </>}
                </div>

                <div className={'model'}>
                  <img className={'deco1'} src={Deco1} alt={''}/>
                  <img className={'deco2'} src={Deco2} alt={''}/>
                  <img className={'model-container'} src={Box}/>
                  {generatedImg.length === 0 ? <></> : <><img className={'model-bbom'} src={generatedImg} alt={''}/></>}
                </div>
                <button onClick={resetButton} className={'reset-button'}> reset </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNftPage;