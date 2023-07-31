import '../styles/signInPage.scss';
import Warn from "../assets/svgs/icon-warning.svg";
import React, {useState} from "react";
import Background from '../assets/pngs/img-sign-in.png';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/ROUTES";
import {useAppDispatch} from "../hooks/useRedux";
import {useForm} from "react-hook-form";
import {requestSignIn} from "../apis/auth";
import {login} from "../store/userSlice";
import {Regex} from "../utils/Regex";
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = async (data: any) => {
    try {
      const res = await requestSignIn(data);
      dispatch(login({token: res.data.data, email: data.email}));
      if (res) {
        navigate(ROUTES.HOME);
      } else {
        setErrorMessage('failed to sign in');
      }
    } catch (e: any) {
      setErrorMessage(e.messasge);
    }
  }

  return (
    <div className={'sign-in'}>
      <div className={'title'}> Sign In </div>
      <form className={'sign-in-form'} onSubmit={handleSubmit(onSubmit)}>
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
            {errors.password && (
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
        <button className={'sign-in-btn'} onClick={handleSubmit(onSubmit)}> Sign in </button>
      </form>
      <div className={'sign-up'}>
        Don't have an account?
        <div className={'link'} onClick={() => {
          navigate(ROUTES.SIGN_UP);
        }}> Sign Up </div>
      </div>
      <img className={'background'} src={Background} alt={''}/>
    </div>
  )
}

export default SignInPage;