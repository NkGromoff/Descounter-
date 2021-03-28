import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  searchGames,
  SetMainPageGamesIdNullReduserCreator,
  SetMainPageSearchGames,
} from "../../../redux/MainPageReduser";
import MainCarts from "./mainCarts";
import icon from "../../../image/search-icon.svg";
import { Field, Form, Formik } from "formik";
import { debounce } from "lodash";
import { Preloader } from "../../shared/Preloader";

const Banners = React.memo((props) => {
  let mainCartEl = [];
  const games = useSelector((state) => state.MainPageReduser.games);
  const gamesSearch = useSelector((state) => state.MainPageReduser.gamesSearch);
  const isFetching = useSelector((state) => state.AllGamesReduser.isFetching);
  let arr = useSelector((state) => state.MainPageReduser.idArray);
  const dispatch = useDispatch();

  const [idForFlip, setIdForFlip] = useState([]);
  const [inputShow, setInputShow] = useState(false);
  const [listShow, setListtShow] = useState(false);
  let gamesSearchDisplay = null;

  const trottleTerm = useCallback(
    debounce((values) => {
      if (values.length >= 2) dispatch(searchGames(values));
      else if (gamesSearch) dispatch(SetMainPageSearchGames([]));
    }, 1000),
    []
  );

  const inputShowChange = () => {
    if (!inputShow) {
      setInputShow((prev) => setInputShow(!prev));
      setTimeout(() => setListtShow((prev) => setListtShow(!prev)), 400);
    } else {
      setTimeout(() => setInputShow((prev) => setInputShow(!prev)), 400);
      setListtShow((prev) => setListtShow(!prev));
    }
  };

  useEffect(() => {
    dispatch(SetMainPageSearchGames([]));
    return () => {
      dispatch(SetMainPageGamesIdNullReduserCreator());
    };
  }, []);
  useEffect(() => {
    if (arr) {
      const interval = setInterval(() => {
        setIdForFlip(arr[Math.floor(Math.random() * arr.length)]);
        const isTwoNumber = Math.floor(Math.random() * (200 - 100) + 100);
        if (isTwoNumber >= 170) {
          let newState = arr[Math.floor(Math.random() * arr.length)];
          setIdForFlip([...idForFlip, newState]);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [arr]);

  if (games) {
    games.forEach((value, key) => {
      if (key % 2 == 0 && key < games.length) {
        mainCartEl.push(
          <MainCarts
            key={value.id}
            id={value.id}
            img={value.img_url}
            price={value.price}
            platform_id={value.platform_id}
            amountDesc={value.amount_discount}
            imgBack={games[key + 1].img_url}
            amountDescBack={games[key + 1].amount_discount}
            priceBack={games[key + 1].price}
            idBack={games[key + 1].id}
            gamesArray={games}
            idForFlip={idForFlip}
          />
        );
      }
    });
  }
  if (gamesSearch) {
    gamesSearchDisplay = gamesSearch.map((i) => <SearchGame key={i.id} id={i.id} title={i.title} price={i.price} />);
  }
  return (
    <>
      <section className="gameGallery">
        <div className="gameGallery__headerWrapper">
          <h1 className="gameGallery__tittle genreTittle">Снижение цен</h1>
          <Formik
            initialValues={{ term: "" }}
            onSubmit={(values, { setSubmitting }) => {
              trottleTerm(values.term);
            }}
          >
            {({ isSubmitting, values, handleChange, submitForm }) => (
              <Form>
                <div className="gameGallery__searchWrapper">
                  <div className={`gameGallery__searchInner ${inputShow ? "gameGallery__searchInner--active" : ""}`}>
                    <Field
                      onChange={(e) => {
                        handleChange(e);
                        submitForm();
                      }}
                      type="text"
                      name="term"
                      className="gameGallery__serchInp"
                      placeholder="Поиск"
                    />
                    <div
                      className={`gameGallery__serchItemWrapper ${
                        listShow ? "gameGallery__serchItemWrapper--active " : ``
                      }`}
                    >
                      {gamesSearchDisplay.length > 0 ? (
                        gamesSearchDisplay
                      ) : isFetching ? (
                        <Preloader />
                      ) : (
                        <span className="gameGallery__searchText">Введите более двух символов</span>
                      )}
                      <NavLink
                        to={gamesSearchDisplay.length > 0 ? `/allGames?term=${values.term}` : "/allGames"}
                        className="gameGallery__serchLink"
                      >
                        Весь список
                      </NavLink>
                    </div>
                  </div>
                  <button onClick={inputShowChange} type="button" className="gameGallery__findButton">
                    <img src={icon} alt="Кнопка" />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="gameGallery__wrapper">{mainCartEl}</div>

        <div className="gameGallery__linkWrapper">
          <NavLink to={`/allGames`} className="gameGallery__link">
            Больше
          </NavLink>
        </div>
      </section>
    </>
  );
});

const SearchGame = (props) => {
  return (
    <>
      <NavLink to={"/GamePage/" + props.id} className="gameGallery__serchItem">
        <span className="gameGallery__searchTitle">{props.title}</span>
        <span className="gameGallery__searchPrice">От {props.price} ₽</span>
      </NavLink>
    </>
  );
};

export default Banners;
