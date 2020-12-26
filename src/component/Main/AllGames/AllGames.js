import React from "react";
import GameCart from "../GameCart/GameCart";

function AllGames() {
  return (
    <>
      <section className="allGames">
        <div className="container">
          <div className="allGames__wrapper">
            <div className="allGames__filterWrapper">
              <div className="allGames__genre">
                <span className="allGames__genreSpan">Жанр</span>
                <svg
                  width="11"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="allGames__triggle"
                >
                  <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                </svg>
              </div>
              <div className="allGames__filterItem allGames__filterPrice">
                <h2 className="allGames__subTittle">Цена</h2>
                <div className="allGames__sliderPrice"></div>
                <div className="allGames__inputWrapper">
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">От</span>
                    <input
                      type="number"
                      min="0"
                      max="9999"
                      className="allGames__input allGames__priceMin"
                    />
                  </div>
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">До</span>
                    <input
                      type="number"
                      min="0"
                      max="9999"
                      className="allGames__input allGames__priceMax"
                    />
                  </div>
                </div>
              </div>
              <div className="allGames__filterItem allGames__filterYear">
                <h2 className="allGames__subTittle">Год</h2>
                <div className="allGames__sliderYear"></div>
                <div className="allGames__inputWrapper">
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">От</span>
                    <input
                      type="number"
                      min="1980"
                      max="2020"
                      className="allGames__input allGames__yearMin"
                    />
                  </div>
                  <div className="allGames__inputWrapperTwo">
                    <span className="allGames__inputSpan">До</span>
                    <input
                      type="number"
                      min="1980"
                      max="2020"
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
                  <button className="allGames__button allGames__priceButton">
                    <span className="allGames__buttonSpan">Цене</span>
                    <svg
                      width="11"
                      height="7"
                      xmlns="http://www.w3.org/2000/svg"
                      className="allGames__triggle"
                    >
                      <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                    </svg>
                  </button>
                </div>
                <div className="allGames__sortItem allGames__sortNew">
                  <button className="allGames__button allGames__priceButton">
                    <span className="allGames__buttonSpan">Новизне</span>
                    <svg
                      width="11"
                      height="7"
                      xmlns="http://www.w3.org/2000/svg"
                      className="allGames__triggle"
                    >
                      <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                    </svg>
                  </button>
                </div>
              </div>
              <ul className="allGames__itemWrapper">
                <GameCart />
                <GameCart />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllGames;
