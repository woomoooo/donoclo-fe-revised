import '../styles/bookPage.scss';
import Back from "../assets/svgs/icon-back.svg";
import React, {useEffect, useState} from "react";
import Tag from '../assets/svgs/book-tag.svg';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import DaumPostcode from "react-daum-postcode";
import {requestBook, requestRecentBook} from "../apis/book";
import Complete from '../assets/svgs/icon-complete.svg';

const BookPage = () => {
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [address, setAddress] = React.useState<string>('');
  const [addressDetail, setAddressDetail] = React.useState<string>('');
  const [postalCode, setPostalCode] = React.useState<string>('');
  const navigate = useNavigate();
  const [recentAddress, setRecentAddress] = useState<string>('');
  const [recentDetailedAddress, setRecentDetailedAddress] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    window.location.reload();
  };

  const onCompletePost = (data: any) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setPostalCode(data.zonecode);
    setAddress(fullAddr);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    width: '90vw',
    height: '80vh',
    margin: '0 auto',
  };

  const createBook = async (postal_code: string, addr: string, detailed_addr: string) => {
    try {
      await requestBook({
        postal_code: postal_code,
        address: addr,
        detailed_address: detailed_addr
      });
      handleToast();
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getRecentBook = async () => {
      try {
        const res = await requestRecentBook();
        if (res) {
          setRecentAddress(res.address);
          setRecentDetailedAddress(res.detailedAddress);
          setPostalCode('0'.repeat(5 - res.postalCode.length) + res.postalCode);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getRecentBook();
  }, [])

  const onClickRecentBook = async () => {
    setAddress(recentAddress);
    setAddressDetail(recentDetailedAddress);
  }

  return (
    <div className={'book'}>
      <img className={'back'} src={Back} alt={''} onClick={() => navigate(ROUTES.HOME)}/>
      <img className={'tag'} src={Tag} alt={''}/>
      <div className={'book-header'}>
        <p className={'title-1'}>
          <div className={'title-1-1'}> BOOK</div>
          <br/>
          <div className={'title-1-2'}> PICK-</div>
          <div className={'title-1-3'}> UP</div>
        </p>
      </div>
      <div className={'recent'}>
        <div className={'title'}> recently-used</div>
        <div className={'recent-address'}>
          {recentAddress === '' ? '최근에 사용한 주소가 없습니다.' : recentAddress + recentDetailedAddress}
          <div className={'select-btn'} onClick={onClickRecentBook}> 선택</div>
        </div>
      </div>
      <div className={'line'}/>
      <div className={'select'}>
        <div className={'select-btn'} onClick={() => setIsOpenPost(!isOpenPost)}> 주소 검색하기</div>
        <div className={'title'}> selected address</div>
        <div className={'postal-code'}> {postalCode}</div>
        <div className={'address'}> {address} </div>
        <input className={'detail-address'} placeholder={'상세주소를 입력해주세요.'}
               defaultValue={addressDetail}
               onChange={(e: any) => {
                 setAddressDetail(e.target.value)
               }}/>
      </div>
      <div className={'book-btn'} onClick={() => createBook(postalCode, address, addressDetail)}> BOOK</div>
      {isOpenPost ? (
        <div className={'address-selector'}
             onClick={() => setIsOpenPost(false)}>
          <DaumPostcode autoClose onComplete={onCompletePost} style={postCodeStyle}/>
        </div>
      ) : null}
      {showToast ? (
        <div className={'toast'}>
          <img className={'complete-icon'} src={Complete} alt={''}/>
          예약이 완료되었습니다!
        </div>
      ) : null}
    </div>
  )
}

export default BookPage;