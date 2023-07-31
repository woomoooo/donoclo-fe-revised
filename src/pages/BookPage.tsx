import '../styles/bookPage.scss';
import Back from "../assets/svgs/icon-back.svg";
import React from "react";
import Tag from '../assets/svgs/book-tag.svg';
import Warn from '../assets/svgs/icon-warning.svg';
const BookPage = () => {
  return (
    <div className={'book'}>
      <img className={'back'} src={Back} alt={''} />
      <img className={'tag'} src={Tag} alt={''} />
      <div className={'book-header'}>
        <p className={'title-1'}>
          <div className={'title-1-1'}> BOOK </div> <br />
          <div className={'title-1-2'}> PICK- </div>
          <div className={'title-1-3'}> UP </div>
        </p>
      </div>
      <div className={'recent'}>
        <div className={'title'}> recently-used </div>
        <div className={'recent-address'}>
          <> 서울특별시 서초구 사임당로 0000 0000호 </>
          <div className={'select-btn'}> 선택 </div>
        </div>
      </div>
      <div className={'line'} />
      <div className={'select'}>
        <div className={'title'}> selected address </div>
        <div className={'select-btn'}> 주소 검색하기 </div>
        <div className={'postal-code'}> 34141 </div>
        <div className={'address'}> 서울특별시 서초구 사임당로 0000 0000호 </div>
        <input className={'detail-address'} placeholder={'상세주소를 입력해주세요.'} />
      </div>
      <div className={'warning'}>
        <img className={'warning-icon'} src={Warn} alt={''} />
        해당 주소는 현재 헌옷 수거를 지원하지 않습니다.
      </div>
      <div className={'book-btn'}> BOOK </div>
    </div>
  )
}

export default BookPage;