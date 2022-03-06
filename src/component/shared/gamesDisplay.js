import React, { useCallback, useEffect, useRef, useState } from "react";
import icon from "../../image/search-icon.svg";
import GameCart from "../Main/GameCart/GameCart";
import Nouislider from "nouislider-react";
import { debounce } from "lodash";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams, StringParam, ArrayParam, withDefault, BooleanParam } from "use-query-params";
import { Preloader } from "./Preloader";

const GamesDisplay = React.memo((props) => {
  const secRef = useRef(null);

  const isFetchScroll = useRef(null);

  const dispatch = useDispatch();
  
  let gameEl = null;

  let genreItem = null;

  const isFetching = useSelector((state) => state.AllGamesReduser.isFetching);

  isFetchScroll.current = isFetching;

  const user = useSelector((state) => state.UserReduser.user);

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  const userGames = useSelector((state) => state.UserReduser.games);

  const allGamesGenre = useSelector((state) => state.AppReduser.genre);

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
    debounce((target) => setQuery((old) => ({ years: [target, old.years[1]] })), 500),
    []
  );

  const trottleDateTwo = useCallback(
    debounce((target) => setQuery((old) => ({ years: [old.years[0], target] })), 500),
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

  const trottleTerm = useCallback(
    debounce((values) => {
      if (values === "") setQuery({ term: undefined });
      else setQuery({ term: values });
    }, 1000),
    []
  );

  let priceSlider = (values) => {
    if (isFetching) return;
    trottlePriceOne(Math.round(values[0]));
    trottlePriceTwo(Math.round(values[1]));
    setPricesForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setPricesForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
  };

  let changePrice = (e) => {
    if (isFetching) return;
    let target = e.currentTarget.value;
    trottlePriceOne(target);
    setPricesForInp((oldArray) => [target, oldArray[1]]);
  };

  let changePriceTwo = (e) => {
    if (isFetching) return;
    let target = e.currentTarget.value;
    trottlePriceTwo(target);
    setPricesForInp((oldArray) => [oldArray[0], target]);
  };

  let yearSlider = (values) => {
    if (isFetching) return;
    trottleDateOne(Math.round(values[0]));
    trottleDateTwo(Math.round(values[1]));
    setYearsForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setYearsForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
  };

  let changeYear = (e) => {
    if (isFetching) return;
    let target = e.currentTarget.value;
    trottleDateOne(target);
    setYearsForInp((oldArray) => [target, oldArray[1]]);
  };

  let changeYearTwo = (e) => {
    if (isFetching) return;
    let target = e.currentTarget.value;
    trottleDateTwo(target);
    setYearsForInp((oldArray) => [oldArray[0], target]);
  };

  let clickFilterPrice = debounce(() => {
    if (isFetching) return;
    setQuery({ newGamesDate: undefined });
    if (query.filterPrice == "priceUp") {
      setQuery({ filterPrice: undefined });
    } else if (query.filterPrice == "priceDown") {
      setQuery({ filterPrice: "priceUp" });
    } else if (query.filterPrice == "none") {
      setQuery({ filterPrice: "priceDown" });
    }
  }, 200);

  let clickFilterNewDate = debounce(() => {
    if (isFetching) return;
    setQuery({ filterPrice: undefined });
    if (query.newGamesDate == "dateUp") {
      setQuery({ newGamesDate: undefined });
    } else if (query.newGamesDate == "dateDown") {
      setQuery({ newGamesDate: "dateUp" });
    } else if (query.newGamesDate == "none") {
      setQuery({ newGamesDate: "dateDown" });
    }
  }, 200);

  let dropDownShow = () => {
    if (isFetching) return;
    if (!isDropDown) setIsDropDown(true);
    else setIsDropDown(false);
  };

  let descChange = debounce(() => {
    if (isFetching) return;
    if (!query.isDesc) {
      setQuery({ isDesc: true });
    } else {
      setQuery({ isDesc: false });
    }
  }, 200);

  let onScrollList = useCallback(() => {
    let scrollBottom;
    if (secRef.current !== null) {
      scrollBottom = secRef.current.clientHeight <= window.pageYOffset + window.innerHeight;
    }
    if (scrollBottom && !isFetchScroll.current) {
      trottleGames();
    }
  }, []);
  let filterVisible = () => {
    setFilterIsVisible((prev) => !prev);
  };

  let genreFilter = (e) => {
    let a = query.genre.find((i) => {
      if (i === e.target.value) {
        return i;
      }
    });
    if (a) {
      setQuery({ genre: query.genre.filter((e) => e !== a) });
    } else {
      let newState = e.target.value;
      setQuery((old) => ({ genre: [...old.genre, newState] }));
    }
  };

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
      <ItemGenre
        key={i.id}
        id={i.id}
        name={i.name}
        isFetching={isFetching}
        genreFilter={genreFilter}
        genre={query.genre}
      />
    ));
  }
  useEffect(() => {
    window.addEventListener("scroll", onScrollList);
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

  return (
    <>
      <section ref={secRef} className="gamesDisplay">
        <div className="container">
          <div className="gamesDisplay__wrapper">
            <div
              className={`gamesDisplay__filterWrapper ${filterIsVisible ? `gamesDisplay__filterWrapper--visible` : ""}`}
            >
              <div className="gamesDisplay__genre">
                <div
                  className={`gamesDisplay__genreHeader ${isFetching ? "gamesDisplay__genre--disabled" : ""}`}
                  onClick={dropDownShow}
                >
                  {query.genre && query.genre.length != 0 ? (
                    <span className="gamesDisplay__genreSpan">Жанры:{query.genre.join(",")}</span>
                  ) : (
                    <span className="gamesDisplay__genreSpan">Жанры</span>
                  )}
                  {isDropDown ? (
                    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="gamesDisplay__triggle">
                      <path d="M0 5.16016H7.93L5.94825 2.58016L3.9655 0.000156403L1.98275 2.58016L0 5.16016Z" />
                    </svg>
                  ) : (
                    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="gamesDisplay__triggle">
                      <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                    </svg>
                  )}
                </div>
                <div className={`gamesDisplay__genreBody ${isDropDown ? "gamesDisplay__genreBody--active" : ""}`}>
                  {genreItem}
                </div>
              </div>
              <div className="gamesDisplay__filterItem gamesDisplay__filterPrice">
                <h2 className="gamesDisplay__subTittle">Цена</h2>
                <div className="gamesDisplay__sliderPrice">
                  <Nouislider
                    connect
                    onChange={priceSlider}
                    start={[pricesForInp[0], pricesForInp[1]]}
                    range={{ min: 0, max: 9999 }}
                    disabled={isFetching}
                    step={100}
                  />
                </div>
                <div className="gamesDisplay__inputWrapper">
                  <div className="gamesDisplay__inputWrapperTwo">
                    <span className="gamesDisplay__inputSpan">От</span>
                    <input
                      type="number"
                      min="0"
                      max="9999"
                      onChange={changePrice}
                      value={pricesForInp[0]}
                      className="gamesDisplay__input gamesDisplay__priceMin"
                      disabled={isFetching}
                    />
                  </div>
                  <div className="gamesDisplay__inputWrapperTwo">
                    <span className="gamesDisplay__inputSpan">До</span>
                    <input
                      type="number"
                      min="0"
                      max="9999"
                      onChange={changePriceTwo}
                      value={pricesForInp[1]}
                      className="gamesDisplay__input gamesDisplay__priceMax"
                      disabled={isFetching}
                    />
                  </div>
                </div>
              </div>
              <div className="gamesDisplay__filterItem gamesDisplay__filterYear">
                <h2 className="gamesDisplay__subTittle">Год</h2>
                <div className="gamesDisplay__sliderYear">
                  <Nouislider
                    connect
                    onChange={yearSlider}
                    range={{ min: 1997, max: 2021 }}
                    start={[yearsForInp[0], yearsForInp[1]]}
                    disabled={isFetching}
                  />
                </div>
                <div className="gamesDisplay__inputWrapper">
                  <div className="gamesDisplay__inputWrapperTwo">
                    <span className="gamesDisplay__inputSpan">От</span>
                    <input
                      type="number"
                      min="1980"
                      max="2021"
                      onChange={changeYear}
                      value={yearsForInp[0]}
                      className="gamesDisplay__input gamesDisplay__yearMin"
                      disabled={isFetching}
                    />
                  </div>
                  <div className="gamesDisplay__inputWrapperTwo">
                    <span className="gamesDisplay__inputSpan">До</span>
                    <input
                      type="number"
                      min="1980"
                      max="2021"
                      onChange={changeYearTwo}
                      value={yearsForInp[1]}
                      className="gamesDisplay__input gamesDisplay__yearMax"
                      disabled={isFetching}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={filterVisible} className="gamesDisplay__buttonFilterMobile">
              {filterIsVisible ? "Скрыть фильтры" : "Показать фильтры"}
            </button>
            <div className="gamesDisplay__wrapperRight">
              <Formik
                enableReinitialize
                initialValues={{ term: query.term }}
                onSubmit={(values, { setSubmitting }) => {
                  trottleTerm(values.term);

                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, values, handleChange, submitForm }) => (
                  <Form>
                    <div className="gamesDisplay__search-Wrapper">
                      <Field
                        onChange={(e) => {
                          handleChange(e);
                          submitForm();
                        }}
                        type="text"
                        name="term"
                        className="gamesDisplay__search"
                        placeholder="Поиск"
                        disabled={isFetching}
                      />

                      <button className="gamesDisplay__search-button" type="submit" disabled={isFetching}>
                        <img src={icon} alt="Кнопка" />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="gamesDisplay__filterWrapperTwo">
                <span className="gamesDisplay__sort">Сортировать:</span>
                <div className="gamesDisplay__sortItem gamesDisplay__sortPrice">
                  <button
                    disabled={isFetching}
                    onClick={clickFilterPrice}
                    className="gamesDisplay__button gamesDisplay__priceButton"
                  >
                    <span
                      className={`gamesDisplay__buttonSpan ${
                        query.filterPrice == "priceDown" || query.filterPrice == "priceUp"
                          ? "gamesDisplay__buttonSpan--active"
                          : ""
                      }`}
                    >
                      По цене
                    </span>
                    {query.filterPrice == "priceUp" ? (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`gamesDisplay__triggle ${
                          query.filterPrice == "priceDown" || query.filterPrice == "priceUp"
                            ? "gamesDisplay__triggle--active"
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
                        className={`gamesDisplay__triggle ${
                          query.filterPrice == "priceDown" || query.filterPrice == "priceUp"
                            ? "gamesDisplay__triggle--active"
                            : ""
                        }`}
                      >
                        <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="gamesDisplay__sortItem gamesDisplay__sortNew">
                  <button
                    disabled={isFetching}
                    onClick={clickFilterNewDate}
                    className="gamesDisplay__button gamesDisplay__priceButton"
                  >
                    <span
                      className={`gamesDisplay__buttonSpan ${
                        query.newGamesDate == "dateDown" || query.newGamesDate == "dateUp"
                          ? "gamesDisplay__buttonSpan--active"
                          : ""
                      }`}
                    >
                      По новизне
                    </span>
                    {query.newGamesDate == "dateUp" ? (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`gamesDisplay__triggle ${
                          query.newGamesDate == "dateDown" || query.newGamesDate == "dateUp"
                            ? "gamesDisplay__triggle--active"
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
                        className={`gamesDisplay__triggle ${
                          query.newGamesDate == "dateDown" || query.newGamesDate == "dateUp"
                            ? "gamesDisplay__triggle--active"
                            : ""
                        }`}
                      >
                        <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="gamesDisplay__sortItem gamesDisplay__descountWrapper">
                  <input
                    disabled={isFetching}
                    id="desc"
                    type="checkbox"
                    className="gamesDisplay__genreCheck"
                    onChange={descChange}
                  />

                  <label
                    htmlFor="desc"
                    className={`gamesDisplay__descSpan ${query.isDesc ? "gamesDisplay__descSpan--active" : ""}`}
                  >
                    Только со скидкой
                  </label>
                </div>
              </div>
              {props.games.length !== 0 ? (
                <div className="gamesDisplay__itemWrapper">{gameEl}</div>
              ) : (
                isFetching == false && <span className="gamesDisplay__emptyAlert">Список пуст</span>
              )}
              {isFetching && <Preloader />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

function ItemGenre(props) {
  const [check, setCheck] = useState(false);
  const find = (e) => e == props.name;
  const checkUpd = debounce((e) => {
    if (props.isFetching) return;
    props.genreFilter(e);
    setCheck((prev) => !prev);
  }, 400);
  useEffect(() => {
    if (props.genre)
      if (props.genre.some(find)) {
        setCheck(true);
      }
  }, [props.genre[0]]);
  return (
    <>
      <div className="gamesDisplay__genreItem">
        <label htmlFor={props.id} className="gamesDisplay__genreSpan">
          {props.name}

          <input
            id={props.id}
            type="checkbox"
            className="gamesDisplay__genreCheck"
            value={props.name}
            onChange={checkUpd}
            checked={check}
            disabled={props.isFetching}
          />
          <span className="checkBox"></span>
        </label>
      </div>
    </>
  );
}

export default GamesDisplay;
