import React, { useCallback, useEffect, useRef, useState } from "react";
import GameCart from "../GameCart/GameCart";
import Nouislider from "nouislider-react";
import { debounce } from "lodash";

function AllGames(props) {
  const secRef = useRef(null);

  let gameEl = null;

  // document.addEventListener("click", (e) => console.log(e.target));

  const [price, setPrice] = useState(0);

  const [priceTwo, setPriceTwo] = useState(9999);

  const [years, setYears] = useState([1997, 2021]);

  const [yearsForInp, setYearsForInp] = useState([1997, 2021]);

  const [priceForInp, setPriceForInp] = useState(0);

  const [priceTwoForInp, setPriceTwoForInp] = useState(9999);

  const [filterPrice, setFilterPrice] = useState("none");

  const [filterNewDate, setfilterNewDate] = useState("none");

  const [isDropDown, setIsDropDown] = useState(false);

  const [genre, setGenre] = useState([]);

  const [isDesc, setIsDesc] = useState(false);

  const [isGamesMore, setIsGamesMore] = useState(false);

  const trottleGames = useCallback(
    debounce(() => setIsGamesMore(true), 500),
    []
  );

  const trottlePriceOne = useCallback(
    debounce((target) => setPrice(target), 500),
    []
  );

  const trottlePriceTwo = useCallback(
    debounce((target) => setPriceTwo(target), 500),
    []
  );

  const trottleDateOne = useCallback(
    debounce((target) => setYears((oldArray) => [target, oldArray[1]]), 500),
    []
  );

  const trottleDateTwo = useCallback(
    debounce((target) => setYears((oldArray) => [oldArray[0], target]), 500),
    []
  );

  let descChange = () => {
    if (!isDesc) setIsDesc(true);
    else setIsDesc(false);
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

  let dropDownWhow = () => {
    if (!isDropDown) setIsDropDown(true);
    else setIsDropDown(false);
  };

  let priceSlider = (values, handle) => {
    trottlePriceOne(Math.round(values[0]));
    trottlePriceTwo(Math.round(values[1]));
    setPriceForInp(Math.round(values[0]));
    setPriceTwoForInp(Math.round(values[1]));
  };

  let yearSlider = (values, handle) => {
    setYearsForInp((oldArray) => [Math.round(values[0]), oldArray[1]]);
    setYearsForInp((oldArray) => [oldArray[0], Math.round(values[1])]);
    trottleDateOne(Math.round(values[0]));
    trottleDateTwo(Math.round(values[1]));
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

  let changePrice = (e) => {
    trottlePriceOne(e.currentTarget.value);
    setPriceForInp(e.currentTarget.value);
  };

  let changePriceTwo = (e) => {
    trottlePriceTwo(e.currentTarget.value);
    setPriceTwoForInp(e.currentTarget.value);
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

  let onScrollList = () => {
    let scrollBottom;
    if (secRef.current !== null) {
      scrollBottom =
        secRef.current.clientHeight <= window.pageYOffset + window.innerHeight;
    }

    if (scrollBottom) {
      trottleGames();
    }
  };

  useEffect(() => {
    props.getGames(
      filterPrice,
      filterNewDate,
      price,
      priceTwo,
      years,
      genre,
      isDesc,
      null
    );
  }, [filterPrice, filterNewDate, price, priceTwo, genre, isDesc, years]);

  useEffect(() => {
    let gamesId = props.games.length;

    if (isGamesMore == true && gamesId) {
      props.getGamesMore(
        filterPrice,
        filterNewDate,
        price,
        priceTwo,
        years,
        genre,
        isDesc,
        gamesId
      );
      setIsGamesMore(false);
    }
  }, [isGamesMore]);

  useEffect(() => {
    return () => {
      window.removeEventListener("scroll", onScrollList);
    };
  }, []);

  useEffect(() => {
    if (secRef.current.clientHeight !== null)
      window.addEventListener("scroll", onScrollList);
  }, [props.games]);

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
    />
  ));
  return (
    <>
      <section ref={secRef} className="allGames">
        <div className="container">
          <div className="allGames__wrapper">
            <div className="allGames__filterWrapper">
              <div className="allGames__genre">
                <div className="allGames__genreHeader" onClick={dropDownWhow}>
                  <span className="allGames__genreSpan">Жанры</span>
                  <svg
                    width="11"
                    height="7"
                    xmlns="http://www.w3.org/2000/svg"
                    className="allGames__triggle"
                  >
                    <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                  </svg>
                </div>
                <div
                  className={`allGames__genreBody ${
                    isDropDown ? "allGames__genreBody--active" : ""
                  }`}
                >
                  <div className="allGames__genreItem">
                    <span className="allGames__genreSpan">Экшен</span>
                    <input
                      type="checkbox"
                      className="allGames__genreCheck"
                      name="one"
                      value="Экшен"
                      onChange={genreFilter}
                    />
                  </div>
                  <div className="allGames__genreItem">
                    <span className="allGames__genreSpan">Инди</span>
                    <input
                      type="checkbox"
                      className="allGames__genreCheck"
                      name="two"
                      value="Инди"
                      onChange={genreFilter}
                    />
                  </div>
                  <div className="allGames__genreItem">
                    <span className="allGames__genreSpan">Гонки</span>
                    <input
                      type="checkbox"
                      className="allGames__genreCheck"
                      name="three"
                      value="Гонки"
                      onChange={genreFilter}
                    />
                  </div>
                  <div className="allGames__genreItem">
                    <span className="allGames__genreSpan">Хоррор</span>
                    <input
                      type="checkbox"
                      className="allGames__genreCheck"
                      name="four"
                      value="Хоррор"
                      onChange={genreFilter}
                    />
                  </div>
                  <div className="allGames__genreItem">
                    <span className="allGames__genreSpan">Приключение</span>
                    <input
                      type="checkbox"
                      className="allGames__genreCheck"
                      name="five"
                      value="Приключение"
                      onChange={genreFilter}
                    />
                  </div>
                </div>
              </div>
              <div className="allGames__filterItem allGames__filterPrice">
                <h2 className="allGames__subTittle">Цена</h2>
                <div className="allGames__sliderPrice">
                  <Nouislider
                    connect
                    onChange={priceSlider}
                    start={[price, priceTwo]}
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
                      value={priceForInp}
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
                      value={priceTwoForInp}
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
              <div className="allGames__filterWrapperTwo">
                <span className="allGames__sort">Сортировать по:</span>
                <div className="allGames__sortItem allGames__sortPrice">
                  <button
                    onClick={clickFilterPrice}
                    className="allGames__button allGames__priceButton"
                  >
                    <span
                      className={`allGames__buttonSpan ${
                        filterPrice == "priceDown" || filterPrice == "priceUp"
                          ? "allGames__buttonSpan--active"
                          : ""
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
                          filterPrice == "priceDown" || filterPrice == "priceUp"
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
                          filterPrice == "priceDown" || filterPrice == "priceUp"
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
                  <button
                    onClick={clickFilterNewDate}
                    className="allGames__button allGames__priceButton"
                  >
                    <span
                      className={`allGames__buttonSpan ${
                        filterNewDate == "dateDown" || filterNewDate == "dateUp"
                          ? "allGames__buttonSpan--active"
                          : ""
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
                          filterNewDate == "dateDown" ||
                          filterNewDate == "dateUp"
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
                          filterNewDate == "dateDown" ||
                          filterNewDate == "dateUp"
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
                  <input
                    type="checkbox"
                    className="allGames__genreCheck"
                    name="two"
                    value="Инди"
                    onChange={descChange}
                  />
                  <span className="allGames__descSpan">Только со скидкой</span>
                </div>
              </div>
              <div className="allGames__itemWrapper">{gameEl}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllGames;
