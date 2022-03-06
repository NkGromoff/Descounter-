import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { confirm, SetUserCode } from "../../redux/UserReduser";
let Congratulations = (props) => {
  const code = useSelector((state) => state.UserReduser.userCode);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.match.params.code) dispatch(confirm(props.match.params.code));
    else dispatch(SetUserCode(3));
  }, []);
  return (
    <>
      <div className="container">
        {code === 3 ? (
          <p className="congratulations">
            Мы отправили вам письмо для подтверждения регистрации. Письмо могло попасть в спам.
          </p>
        ) : code === 1 ? (
          <p className="congratulations">
            Вы успешно зарегистрировались. Можете выполнить
            <NavLink to="/Login" className="congratulations__link">
              {` вход`}
            </NavLink>
          </p>
        ) : (
          <p className="congratulations">Ссылка не активна</p>
        )}
      </div>
    </>
  );
};

export default Congratulations;
