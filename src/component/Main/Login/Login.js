import vk from "../../../image/vk.png";
import google from "../../../image/google.png";
import faceBook from "../../../image/faceBook.png";
import React from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { allInputs } from "../../Validation/Validations";

function Login() {
  return (
    <>
      <Formik
        initialValues={{ login: "", password: "" }}
        validate={allInputs}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
