import '../styles/signInPage.scss';
import Warn from "../assets/svgs/icon-warning.svg";
import React from "react";
import Background from '../assets/pngs/img-sign-in.png';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className={'sign-in'}>
      <div className={'title'}> Sign In </div>
      <form className={'sign-in-form'}>
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
        <button className={'sign-in-btn'}> Sign in </button>
      </form>
      <div className={'sign-up'}>
        Don't have an account?
        <div className={'link'} onClick={() => {
          navigate(ROUTES.SIGN_UP);
        }}> Sign Up </div>
      </div>
      <img className={'background'} src={Background} alt={''} />
    </div>
  )
}
export default SignInPage;