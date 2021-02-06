import React, { useCallback, useEffect, useRef, useState } from "react";
import icon from "../../image/search-icon.svg";
import GameCart from "../Main/GameCart/GameCart";
import Nouislider from "nouislider-react";
import { debounce } from "lodash";
import { Field, FieldArray, Form, Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { getGameGenre } from "../../redux/AllGamesReduser";
import { useQueryParams, StringParam, NumberParam, ArrayParam, withDefault, BooleanParam } from "use-query-params";
import { Preloader } from "./Preloader";

const GamesDisplay = (props) => {
  const secRef = useRef(null);

  const dispatch = useDispatch();

  let gameEl = null;

  let genreItem = null;

  const isFetching = useSelector((state) => state.AllGamesReduser.isFetching);

  const user = useSelector((state) => state.UserReduser.user);

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  const userGames = useSelector((state) => state.UserReduser.games);

  const allGamesGenre = useSelector((state) => state.AllGamesReduser.genre);

  const [pricesForInp, setPricesForInp] = useState([0, 9999]);

  const [yearsForInp, setYearsForInp] = useState([1997, 2021]);

  const [isDropDown, setIsDropDown] = useState(false);

  const [filterIsVisible, setFilterIsVisible] = useState(false);

  const [isGamesMore, setIsGamesMore] = useState(false);

  const [query, setQuery] = useQueryParams({
    isDesc: withDefault(BooleanParam, false),
    newGamesDate: withDefault(StringParam, "none"),
    filterPrice: withDefault(StringParam, "none"),
    term: withDefault(StringParam, ""),
    prices: withDefault(ArrayParam, [0, 9999]),
    years: withDefault(ArrayParam, [1997, 2021]),
    genre: withDefault(ArrayParam, []),
  });

  const trottleDateOne = useCallback(
    debounce((target) => setQuery((old) => ({ years: [old.years[0], target] })), 500),
    []
  );

  const trottleDateTwo = useCallback(
    debounce((target) => setQuery((old) => ({ years: [old.years[1], target] })), 500),
    []
  );

  const trottlePriceOne = useCallback(
    debounce((target) => setQuery((old) => ({ prices: [target, old.prices[1]] })), 500),
    []
  );

  const trottlePriceTwo = useCallback(
    debounce((target) => setQuery((old) => ({ prices: [old.prices[0], target] })), 500),
    []
  );

  const trottleGames = useCallback(
    debounce(() => setIsGamesMore(true), 500),
    []
  );

  let priceSlider = (values, handle) => {
    trottlePriceOne(Math.round(values[0]));
    trottlePriceTwo(Math.round(values[1]));
    setPricesForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setPricesForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
  };
  let changePrice = (e) => {
    let target = e.currentTarget.value;
    trottlePriceOne(target);
    setPricesForInp((oldArray) => [target, oldArray[1]]);
  };

  let changePriceTwo = (e) => {
    let target = e.currentTarget.value;
    trottlePriceTwo(target);
    setPricesForInp((oldArray) => [oldArray[0], target]);
  };

  let yearSlider = (values, handle) => {
    trottleDateOne(Math.round(values[0]));
    trottleDateTwo(Math.round(values[1]));
    setYearsForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setYearsForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
  };

  let changeYear = (e) => {
    let target = e.currentTarget.value;
    trottleDateOne(target);
    setYearsForInp((oldArray) => [target, oldArray[1]]);
  };

  let changeYearTwo = (e) => {
    let target = e.currentTarget.value;
    trottleDateTwo(target);
    setYearsForInp((oldArray) => [oldArray[0], target]);
  };

  let clickFilterPrice = () => {
    setQuery({ newGamesDate: undefined });
    if (query.filterPrice == "priceUp") {
      setQuery((old) => ({ filterPrice: undefined }));
    } else if (query.filterPrice == "priceDown") {
      setQuery((old) => ({ filterPrice: "priceUp" }));
    } else if (query.filterPrice == "none") {
      setQuery((old) => ({ filterPrice: "priceDown" }));
    }
  };

  let clickFilterNewDate = () => {
    setQuery({ filterPrice: undefined });
    if (query.newGamesDate == "dateUp") {
      setQuery({ newGamesDate: undefined });
    } else if (query.newGamesDate == "dateDown") {
      setQuery({ newGamesDate: "dateUp" });
    } else if (query.newGamesDate == "none") {
      setQuery({ newGamesDate: "dateDown" });
    }
  };

  let dropDownShow = () => {
    if (!isDropDown) setIsDropDown(true);
    else setIsDropDown(false);
  };

  let descChange = () => {
    if (!query.isDesc) {
      setQuery({ isDesc: true });
    } else {
      setQuery({ isDesc: false });
    }
  };

  let onScrollList = () => {
    let scrollBottom;
    if (secRef.current !== null) {
      scrollBottom = secRef.current.clientHeight <= window.pageYOffset + window.innerHeight;
    }

    if (scrollBottom) {
      trottleGames();
    }
  };

  let filterVisible = (e) => {
    setFilterIsVisible((prev) => !prev);
  };

  let genreFilter = (e) => {
    let a = query.genre.find((i) => {
      if (i === e.currentTarget.value) {
        return i;
      }
    });
    if (a) {
      setQuery({ genre: query.genre.filter((e) => e !== a) });
    } else {
      let newState = e.currentTarget.value;
      setQuery((old) => ({ genre: [...old.genre, newState] }));
    }
  };
  let termChange = (value) => {};

  if (props.games) {
    gameEl = props.games.map((g) => (
      <GameCart
        key={g.id}
        id={g.id}
        name={g.title}
        img={g.img_url}
        desc={g.description}
        price={g.price}
        amountDisc={g.amount_discount}
        tag={g.tag_game}
        year={g.year_release}
        platformId={g.platform_id}
        isAuth={isAuth}
        userGames={userGames}
        user={user}
      />
    ));
  }
  if (allGamesGenre) {
    genreItem = allGamesGenre.map((i) => (
      <ItemGenre key={i.id} id={i.id} name={i.name} genreFilter={genreFilter} genre={query.genre} />
    ));
  }
  useEffect(() => {
    dispatch(getGameGenre());
    return () => {
      window.removeEventListener("scroll", onScrollList);
    };
  }, []);

  useEffect(() => {
    setPricesForInp((oldArray) => [query.prices[0], oldArray[1]]);
    setPricesForInp((oldArray) => [oldArray[0], query.prices[1]]);
    setYearsForInp((oldArray) => [query.years[0], oldArray[1]]);
    setYearsForInp((oldArray) => [oldArray[0], query.years[1]]);
    props.childProps(
      query.years,
      query.prices,
      query.filterPrice,
      query.newGamesDate,
      query.isDesc,
      query.genre,
      isGamesMore,
      query.term
    );
    setIsGamesMore(false);
  }, [query, isGamesMore, setQuery]);

  useEffect(() => {
    if (secRef.current.clientHeight !== null) window.addEventListener("scroll", onScrollList);
  }, [props.games]);

  return (
    <>
      <section ref={secRef} className="allGames">
        <div className="container">
          <div className="allGames__wrapper">
            <div className={`allGames__filterWrapper ${filterIsVisible ? `allGames__filterWrapper--visible` : ""}`}>
              <div className="allGames__genre">
                <div className="allGames__genreHeader" onClick={dropDownShow}>
                  {query.genre && query.genre.length != 0 ? (
                    <span className="allGames__genreSpan">Жанры:{query.genre.join(",")}</span>
                  ) : (
                    <span className="allGames__genreSpan">Жанры</span>
                  )}
                  {isDropDown ? (
                    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="allGames__triggle">
                      <path d="M0 5.16016H7.93L5.94825 2.58016L3.9655 0.000156403L1.98275 2.58016L0 5.16016Z" />
                    </svg>
                  ) : (
                    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="allGames__triggle">
                      <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                    </svg>
                  )}
                </div>
                <div className={`allGames__genreBody ${isDropDown ? "allGames__genreBody--active" : ""}`}>
                  {genreItem}
                </div>
              </div>
              <div className="allGames__filterItem allGames__filterPrice">
                <h2 className="allGames__subTittle">Цена</h2>
                <div className="allGames__sliderPrice">
                  <Nouislider
                    connect
                    onChange={priceSlider}
                    start={[pricesForInp[0], pricesForInp[1]]}
                    range={{ min: 0, max: 9999 }}
                    step={100}
                  />
                </div>
                <div className="allGames__inputWrapper">
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">От</span>
                    <input
                      type="number"
                      min="0"
                      max="9999"
                      onChange={changePrice}
                      value={pricesForInp[0]}
                      className="allGames__input allGames__priceMin"
                    />
                  </div>
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">До</span>
                    <input
                      type="number"
                      min="0"
                      max="9999"
                      onChange={changePriceTwo}
                      value={pricesForInp[1]}
                      className="allGames__input allGames__priceMax"
                    />
                  </div>
                </div>
              </div>
              <div className="allGames__filterItem allGames__filterYear">
                <h2 className="allGames__subTittle">Год</h2>
                <div className="allGames__sliderYear">
                  <Nouislider
                    connect
                    onChange={yearSlider}
                    range={{ min: 1997, max: 2021 }}
                    start={[yearsForInp[0], yearsForInp[1]]}
                  />
                </div>
                <div className="allGames__inputWrapper">
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">От</span>
                    <input
                      type="number"
                      min="1980"
                      max="2021"
                      onChange={changeYear}
                      value={yearsForInp[0]}
                      className="allGames__input allGames__yearMin"
                    />
                  </div>
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">До</span>
                    <input
                      type="number"
                      min="1980"
                      max="2021"
                      onChange={changeYearTwo}
                      value={yearsForInp[1]}
                      className="allGames__input allGames__yearMax"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={filterVisible} className="allGames__buttonFilterMobile">
              {filterIsVisible ? "Скрыть фильтры" : "Показать фильтры"}
            </button>
            <div className="allGames__wrapperRight">
              <Formik
                enableReinitialize
                initialValues={{ term: query.term }}
                onSubmit={(values, { setSubmitting }) => {
                  if (values.term === "") setQuery({ term: undefined });
                  setQuery({ term: values.term });
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="allGames__search-Wrapper">
                      <Field type="text" name="term" className="allGames__search" placeholder="Поиск" />
                      <button className="allGames__search-button" type="submit" disabled={isSubmitting}>
                        <img src={icon} alt="Кнопка" />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="allGames__filterWrapperTwo">
                <span className="allGames__sort">Сортировать по:</span>
                <div className="allGames__sortItem allGames__sortPrice">
                  <button onClick={clickFilterPrice} className="allGames__button allGames__priceButton">
                    <span
                      className={`allGames__buttonSpan ${
                        query.filterPrice == "priceDown" || query.filterPrice == "priceUp"
                          ? "allGames__buttonSpan--active"
                          : ""
                      }`}
                    >
                      Цене
                    </span>
                    {query.filterPrice == "priceUp" ? (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`allGames__triggle ${
                          query.filterPrice == "priceDown" || query.filterPrice == "priceUp"
                            ? "allGames__triggle--active"
                            : ""
                        }`}
                      >
                        <path d="M0 5.16016H7.93L5.94825 2.58016L3.9655 0.000156403L1.98275 2.58016L0 5.16016Z" />
                      </svg>
                    ) : (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`allGames__triggle ${
                          query.filterPrice == "priceDown" || query.filterPrice == "priceUp"
                            ? "allGames__triggle--active"
                            : ""
                        }`}
                      >
                        <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="allGames__sortItem allGames__sortNew">
                  <button onClick={clickFilterNewDate} className="allGames__button allGames__priceButton">
                    <span
                      className={`allGames__buttonSpan ${
                        query.newGamesDate == "dateDown" || query.newGamesDate == "dateUp"
                          ? "allGames__buttonSpan--active"
                          : ""
                      }`}
                    >
                      Новизне
                    </span>
                    {query.newGamesDate == "dateUp" ? (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`allGames__triggle ${
                          query.newGamesDate == "dateDown" || query.newGamesDate == "dateUp"
                            ? "allGames__triggle--active"
                            : ""
                        }`}
                      >
                        <path d="M0 5.16016H7.93L5.94825 2.58016L3.9655 0.000156403L1.98275 2.58016L0 5.16016Z" />
                      </svg>
                    ) : (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`allGames__triggle ${
                          query.newGamesDate == "dateDown" || query.newGamesDate == "dateUp"
                            ? "allGames__triggle--active"
                            : ""
                        }`}
                      >
                        <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="allGames__sortItem allGames__descountWrapper">
                  <input id="desc" type="checkbox" className="allGames__genreCheck" onChange={descChange} />

                  <label
                    htmlFor="desc"
                    className={`allGames__descSpan ${query.isDesc ? "allGames__descSpan--active" : ""}`}
                  >
                    Только со скидкой
                  </label>
                </div>
              </div>
              <div className="allGames__itemWrapper">{gameEl}</div>
              {isFetching && <Preloader />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function ItemGenre(props) {
  const [check, setCheck] = useState(false);
  const find = (e) => e == props.name;
  const checkUpd = (e) => {
    props.genreFilter(e);
    setCheck((prev) => !prev);
  };
  useEffect(() => {
    if (props.genre)
      if (props.genre.some(find)) {
        setCheck(true);
      }
  }, [props.genre[0]]);
  return (
    <>
      <div className="allGames__genreItem">
        <label htmlFor={props.id} className="allGames__genreSpan">
          {props.name}

          <input
            id={props.id}
            type="checkbox"
            className="allGames__genreCheck"
            value={props.name}
            onChange={checkUpd}
            checked={check}
          />
          <span className="checkBox"></span>
        </label>
      </div>
    </>
  );
}

export default GamesDisplay;
