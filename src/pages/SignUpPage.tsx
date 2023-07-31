import '../styles/signUpPage.scss';
import Warn from "../assets/svgs/icon-warning.svg";
import React from "react";
import Background from '../assets/pngs/img-sign-up.png';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className={'sign-up'}>
      <div className={'title'}> Sign Up </div>
      <form className={'sign-up-form'}>
        <div className={'form-wrap'}>
          <div className={'form-input'}>
            <input className={'input'} type={'email'} placeholder={'Email Address'} />
            <img className={'error-icon'} src={Warn} alt={''} />
          </div>
          <div className={'error-message'}> error message</div>
        </div>


        <div className={'form-wrap'}>
          <div className={'form-input'}>
            <input className={'input'} type={'password'} placeholder={'Password'} />
          </div>
        </div>
        <div className={'form-wrap'}>
          <div className={'form-input'}>
            <input className={'input'} type={'phone'} placeholder={'Phone number'} />
          </div>
        </div>
        <button className={'sign-up-btn'}> Sign up </button>
      </form>
      <div className={'sign-in'}>
        Already have an account?
        <div className={'link'} onClick={() => {
          navigate(ROUTES.SIGN_IN);
        }}> Sign In </div>
      </div>
      <img className={'background'} src={Background} alt={''} />
    </div>
  )
}
export default SignUpPage;