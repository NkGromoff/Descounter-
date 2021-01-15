import React from "react";

export const allInputs = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Введите почту";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Вы ввели не правильную почту";
  }
  if (!values.login) {
    errors.login = "Введите логин";
  } else if (!/^[a-z0-9]+$/i.test(values.login)) {
    errors.login = "Ник должен состоять из латиницы";
  } else if (values.login.length < 6) {
    errors.login = "Ник должен иметь не мнее 6 символов";
  }
  if (!values.password) {
    errors.password = "Введите пароль";
  } else if (values.password.length < 10) {
    errors.password = "Пароль должен иметь не мнее 10 символов";
  }
  if (!values.passwordTwo) {
    errors.passwordTwo = "Введите пароль";
  } else if (values.passwordTwo !== values.password) {
    errors.passwordTwo = "Пароль не совпадает";
  }
  return errors;
};
