import React, { useCallback, useEffect, useRef, useState } from "react";
import icon from "../../image/search-icon.svg";
import GameCart from "../Main/GameCart/GameCart";
import Nouislider from "nouislider-react";
import { debounce } from "lodash";
import { Field, FieldArray, Form, Formik } from "formik";
import { allInputs } from "../Validation/Validations";
import { useDispatch, useSelector } from "react-redux";
import { getGameGenre } from "../../redux/AllGamesReduser";
import { getGames } from "../../redux/UserReduser";
const GamesDisplay = (props) => {
  const secRef = useRef(null);

  const dispatch = useDispatch();

  let gameEl = null;

  let genreItem = null;

  const user = useSelector((state) => state.UserReduser.user);

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  const userGames = useSelector((state) => state.UserReduser.games);

  const allGamesGenre = useSelector((state) => state.AllGamesReduser.genre);

  const [prices, setPrices] = useState([0, 9999]);

  const [pricesForInp, setPricesForInp] = useState([0, 9999]);

  const [years, setYears] = useState([1997, 2021]);

  const [yearsForInp, setYearsForInp] = useState([1997, 2021]);

  const [filterPrice, setFilterPrice] = useState("none");

  const [filterNewDate, setfilterNewDate] = useState("none");

  const [isDropDown, setIsDropDown] = useState(false);

  const [isDesc, setIsDesc] = useState(false);

  const [genre, setGenre] = useState([]);

  const [isGamesMore, setIsGamesMore] = useState(false);

  const [term, setTerm] = useState("");

  const trottleDateOne = useCallback(
    debounce((target) => setYears((oldArray) => [target, oldArray[1]]), 500),
    []
  );

  const trottleDateTwo = useCallback(
    debounce((target) => setYears((oldArray) => [oldArray[0], target]), 500),
    []
  );

  const trottlePriceOne = useCallback(
    debounce((target) => setPrices((oldArray) => [target, oldArray[1]]), 500),
    []
  );

  const trottlePriceTwo = useCallback(
    debounce((target) => setPrices((oldArray) => [oldArray[0], target]), 500),
    []
  );

  const trottleGames = useCallback(
    debounce(() => setIsGamesMore(true), 500),
    []
  );

  let priceSlider = (values, handle) => {
    setPricesForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setPricesForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
    trottlePriceOne(Math.round(values[0]));
    trottlePriceTwo(Math.round(values[1]));
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
    setYearsForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setYearsForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
    trottleDateOne(Math.round(values[0]));
    trottleDateTwo(Math.round(values[1]));
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
    setfilterNewDate("none");
    if (filterPrice == "priceUp") setFilterPrice("none");
    else if (filterPrice == "priceDown") setFilterPrice("priceUp");
    else if (filterPrice == "none") setFilterPrice("priceDown");
  };

  let clickFilterNewDate = () => {
    setFilterPrice("none");
    if (filterNewDate == "dateUp") setfilterNewDate("none");
    else if (filterNewDate == "dateDown") setfilterNewDate("dateUp");
    else if (filterNewDate == "none") setfilterNewDate("dateDown");
  };

  let dropDownShow = () => {
    if (!isDropDown) setIsDropDown(true);
    else setIsDropDown(false);
  };

  let descChange = () => {
    if (!isDesc) setIsDesc(true);
    else setIsDesc(false);
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

  let genreFilter = (e) => {
    let a = genre.find((i) => {
      if (i === e.currentTarget.value) {
        return i;
      }
    });
    if (a) {
      setGenre(genre.filter((e) => e !== a));
    } else {
      let newState = e.currentTarget.value;
      setGenre((oldArray) => [...oldArray, newState]);
    }
  };

  let termChange = (value) => {
    setTerm(value);
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
      <ItemGenre key={i.id} id={i.id} name={i.name} genreFilter={genreFilter} gnere={genre} />
    ));
  }
  useEffect(() => {
    dispatch(getGameGenre());
    return () => {
      window.removeEventListener("scroll", onScrollList);
    };
  }, []);

  useEffect(() => {
    props.childProps(years, prices, filterPrice, filterNewDate, isDesc, genre, isGamesMore, term);
    setIsGamesMore(false);
  }, [years, prices, filterPrice, filterNewDate, isDesc, genre, isGamesMore, term]);

  useEffect(() => {
    if (secRef.current.clientHeight !== null) window.addEventListener("scroll", onScrollList);
  }, [props.games]);

  return (
    <>
      <section ref={secRef} className="allGames">
        <div className="container">
          <div className="allGames__wrapper">
            <div className="allGames__filterWrapper">
              <div className="allGames__genre">
                <div className="allGames__genreHeader" onClick={dropDownShow}>
                  {genre && genre.length != 0 ? (
                    <span className="allGames__genreSpan">Жанры:{genre.join(",")}</span>
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
                    start={[prices[0], prices[1]]}
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
            <div className="allGames__wrapperRight">
              <Formik
                initialValues={{ term: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTerm(JSON.stringify(values.term));
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
                        filterPrice == "priceDown" || filterPrice == "priceUp" ? "allGames__buttonSpan--active" : ""
                      }`}
                    >
                      Цене
                    </span>
                    {filterPrice == "priceUp" ? (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`allGames__triggle ${
                          filterPrice == "priceDown" || filterPrice == "priceUp" ? "allGames__triggle--active" : ""
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
                          filterPrice == "priceDown" || filterPrice == "priceUp" ? "allGames__triggle--active" : ""
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
                        filterNewDate == "dateDown" || filterNewDate == "dateUp" ? "allGames__buttonSpan--active" : ""
                      }`}
                    >
                      Новизне
                    </span>
                    {filterNewDate == "dateUp" ? (
                      <svg
                        width="11"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`allGames__triggle ${
                          filterNewDate == "dateDown" || filterNewDate == "dateUp" ? "allGames__triggle--active" : ""
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
                          filterNewDate == "dateDown" || filterNewDate == "dateUp" ? "allGames__triggle--active" : ""
                        }`}
                      >
                        <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="allGames__sortItem allGames__descountWrapper">
                  {isDesc == true ? (
                    <input
                      id="desc"
                      type="checkbox"
                      className="allGames__genreCheck"
                      name="two"
                      value="Инди"
                      onChange={descChange}
                      checked
                    />
                  ) : (
                    <input id="desc" type="checkbox" className="allGames__genreCheck" onChange={descChange} />
                  )}

                  <label htmlFor="desc" className={`allGames__descSpan ${isDesc ? "allGames__descSpan--active" : ""}`}>
                    Только со скидкой
                  </label>
                </div>
              </div>
              <div className="allGames__itemWrapper">{gameEl}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function ItemGenre(props) {
  return (
    <>
      <div className="allGames__genreItem">
        <label htmlFor={props.id} className="allGames__genreSpan">
          {props.name}
        </label>

        <input
          id={props.id}
          type="checkbox"
          className="allGames__genreCheck"
          value={props.name}
          onChange={props.genreFilter}
        />
        <span className="checkBox"></span>
      </div>
    </>
  );
}

export default GamesDisplay;
