import '../styles/signUpPage.scss';
import Warn from "../assets/svgs/icon-warning.svg";
import React, {useState} from "react";
import Background from '../assets/pngs/img-sign-up.png';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import {Regex} from "../utils/Regex";
import {useForm} from "react-hook-form";
import {requestSignup} from "../apis/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = async (data: any) => {
    try {
      const res = await requestSignup(data);
      if (res) {
        navigate(ROUTES.SIGN_IN);
      } else {
        setErrorMessage('failed to sign up');
      }
    } catch (e: any) {
      setErrorMessage(e.messasge);
    }
  }
  return (
    <div className={'sign-up'}>
      <div className={'title'}> Sign Up</div>
      <form className={'sign-up-form'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'form-wrap'}>
          <div className={'form-input'}>
            <input
              {...register("email", {required: true, pattern: Regex.email})}
              className={'input'} type={'email'} placeholder={'Email Address'}/>
            {errors.email && (
              <img className={'error-icon'} src={Warn} alt={''}/>
            )}
          </div>
          {errors.email?.type === "required" ? (
            <div className={'error-message'}>
              Email Address is required
            </div>
          ) : errors.email?.type === "pattern" ? (
            <div className={'error-message'}>
              Email Address is invalid
            </div>
          ) : null}
        </div>


        <div className={'form-wrap'}>
          <div className={'form-input'}>
            <input
              {...register("password", {
                required: true,
                pattern: Regex.password,
              })}
              className={'input'} type={'password'} placeholder={'Password'}/>
            {errors.email && (
              <img className={'error-icon'} src={Warn} alt={''}/>
            )}
          </div>
          {errors.password?.type === "required" ? (
            <div className={'error-message'}>
              Password Address is required
            </div>
          ) : errors.password?.type === "pattern" ? (
            <div className={'error-message'}>
              Password Address is invalid
            </div>
          ) : null}
        </div>
        <button className={'sign-up-btn'} onClick={handleSubmit(onSubmit)}>
          Sign up
        </button>
      </form>
      <div className={'sign-in'}>
        Already have an account?
        <div className={'link'} onClick={() => {
          navigate(ROUTES.SIGN_IN);
        }}> Sign In </div>
      </div>
      <img className={'background'} src={Background} alt={''}/>
    </div>
  )
}

export default SignUpPage;