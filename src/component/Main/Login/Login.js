import vk from "../../../image/vk.png";
import google from "../../../image/google.png";
import faceBook from "../../../image/faceBook.png";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginLogValid, onePasswordVaild } from "../../Validation/Validations";
import { login } from "../../../redux/UserReduser";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  const [captcha, setCaptcha] = useState(false);
  let captchaChange = () => {
    setCaptcha(true);
  };
  if (isAuth) return <Redirect to="/" />;
  return (
    <>
      <Formik
        initialValues={{ login: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          if (captcha == true) {
            dispatch(login(values.login, values.password));
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <section className="loginOrReg">
              <div className="loginOrReg__wrapper">
                <h2 className="loginOrReg__title">Вход</h2>
                <div className="loginOrReg__item">
                  <span className="loginOrReg__upperText">Введите логин</span>
                  <Field
                    type="text"
                    name="login"
                    validate={loginLogValid}
                    className={
                      errors.login && touched.login
                        ? "loginOrReg__inp loginOrReg__inp--error"
                        : "loginOrReg__inp"
                    }
                  />
                  <ErrorMessage
                    name="login"
                    className="loginOrReg__error"
                    component="div"
                  />
                </div>
                <div className="loginOrReg__item">
                  <span className="loginOrReg__upperText">Введите пароль</span>
                  <Field
                    type="password"
                    name="password"
                    validate={onePasswordVaild}
                    className={
                      errors.password && touched.password
                        ? "loginOrReg__inp loginOrReg__inp--error"
                        : "loginOrReg__inp"
                    }
                  />
                  <ErrorMessage
                    name="password"
                    className="loginOrReg__error"
                    component="div"
                  />
                </div>
                <div className="loginOrReg__itemReCaptcha">
                  <ReCAPTCHA
                    sitekey="6Le2hDEaAAAAABCAiHFJHXL4QC30WFuxcCUGeknN"
                    onChange={captchaChange}
                  />
                </div>
                <button
                  className={
                    isSubmitting
                      ? "loginOrReg__btn"
                      : "loginOrReg__btn loginOrReg__btn--disable"
                  }
                  type="submit"
                  disabled={isSubmitting}
                >
                  Войти
                </button>
                <h2 className="loginOrReg__title">Быстрый Вход</h2>
                <div className="loginOrReg__quickWrapper">
                  <a href="#" className="loginOrReg__quickLink">
                    <img
                      src={google}
                      alt="Иконка"
                      className="loginOrReg__quickImg"
                    />
                  </a>
                  <a href="#" className="loginOrReg__quickLink">
                    <img
                      src={vk}
                      alt="Иконка"
                      className="loginOrReg__quickImg"
                    />
                  </a>
                  <a href="#" className="loginOrReg__quickLink">
                    <img
                      src={faceBook}
                      alt="Иконка"
                      className="loginOrReg__quickImg"
                    />
                  </a>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
      <div className="container"></div>
    </>
  );
}

export default Login;
