import vk from "../../../image/vk.png";
import google from "../../../image/google.png";
import faceBook from "../../../image/faceBook.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  emailValid,
  loginRegValid,
  loginValid,
  passwordVaild,
} from "../../Validation/Validations";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/UserReduser";
import { Redirect } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  if (isAuth) return <Redirect to="/" />;
  return (
    <>
      <Formik
        initialValues={{ login: "", email: "", password: "", passwordTwo: "" }}
        validate={passwordVaild}
        onSubmit={(values, { setSubmitting }) => {
          console.log("object");
          dispatch(
            setUser(
              values.login,
              values.email,
              values.password,
              values.passwordTwo
            )
          );
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="container">
              <section className="loginOrReg">
                <div className="loginOrReg__wrapper">
                  <h2 className="loginOrReg__title">Регистрация</h2>
                  <div className="loginOrReg__item">
                    <span className="loginOrReg__upperText">Введите логин</span>
                    <Field
                      type="text"
                      name="login"
                      validate={loginRegValid}
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
                    <span className="loginOrReg__upperText">Введите почту</span>
                    <Field
                      type="text"
                      name="email"
                      validate={emailValid}
                      className={
                        errors.email && touched.email
                          ? "loginOrReg__inp loginOrReg__inp--error"
                          : "loginOrReg__inp"
                      }
                    />
                    <ErrorMessage
                      name="email"
                      className="loginOrReg__error"
                      component="div"
                    />
                  </div>
                  <div className="loginOrReg__item">
                    <span className="loginOrReg__upperText">
                      Введите пароль
                    </span>
                    <Field
                      type="password"
                      name="password"
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
                  <div className="loginOrReg__item">
                    <span className="loginOrReg__upperText">
                      Повторите пароль
                    </span>
                    <Field
                      type="password"
                      name="passwordTwo"
                      className={
                        errors.passwordTwo && touched.passwordTwo
                          ? "loginOrReg__inp loginOrReg__inp--error"
                          : "loginOrReg__inp"
                      }
                    />
                    <ErrorMessage
                      name="passwordTwo"
                      className="loginOrReg__error"
                      component="div"
                    />
                  </div>
                  <button
                    type="submit"
                    className={
                      isSubmitting
                        ? "loginOrReg__btn"
                        : "loginOrReg__btn loginOrReg__btn--disable"
                    }
                    disabled={isSubmitting}
                  >
                    Отправить
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
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Registration;
