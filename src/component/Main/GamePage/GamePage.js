import React, { useState } from "react";

import ShopCart from "./ShopCart";

function GamePage(props) {
  let date;
  if (props[0]) date = props[0].year_release;

  let formatDate = (date) => {
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = "0" + yy;

    return dd + "." + mm + "." + yy;
  };
  const [systemRec, setSystemRec] = useState(false);

  let gameShop = null;

  if (!props[0] && props.oneGameShop !== null) {
    return <div className="container loading">Загрузка...</div>;
  }

  let onClickSetSystemRec = (e) => {
    if (e.target.classList.contains("game__buttonSystem--active")) return;
    if (systemRec) setSystemRec(false);
    else setSystemRec(true);
  };

  gameShop = props.oneGameShop.map((s) => (
    <ShopCart
      key={s.id}
      price={s.price}
      prevPrice={s.starting_price}
      name={s.name}
      amountDisc={s.amount_discount}
      url={s.url}
    />
  ));
  return (
    <>
      <div className="container">
        <section className="game">
          <div className="game__wrapper">
            <div className="game__left">
              <img
                src={props[0].img_url}
                alt="Изображение игры"
                className="game__gameImg"
              />
              <div className="game__dateWrapper">
                <h2 className="game__dateTittle">Дата выхода:</h2>
                <span className="game__dateText">
                  {formatDate(new Date(date))}
                </span>
              </div>
              <h2 className="game__systemTittle">Системные требования</h2>
              <div className="game__buttonWrapper">
                <button
                  onClick={onClickSetSystemRec}
                  className={`game__buttonSystem buttonSystem ${
                    !systemRec ? "game__buttonSystem--active" : ""
                  }`}
                  data-system="min"
                >
                  Минимальные
                </button>
                {props[1].os === "None" &&
                props[1].directx === "None" &&
                props[1].cpu === "None" &&
                props[1].videocard === "None" &&
                props[1].ram === "None" &&
                props[1].freespace === "None" ? (
                  ``
                ) : (
                  <button
                    onClick={onClickSetSystemRec}
                    className={`game__buttonSystem buttonSystem ${
                      systemRec ? "game__buttonSystem--active" : ""
                    }`}
                    data-system="rec"
                  >
                    Рекомендуемые
                  </button>
                )}
              </div>
              {systemRec == false ? (
                <div className="game__systemWrapper">
                  <div className="game__secondWrapper">
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">DirectX</h3>
                      {props[0].directx == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">
                          {props[0].directx}
                        </span>
                      )}
                    </div>
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">ОС</h3>
                      {props[0].os == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">{props[0].os}</span>
                      )}
                    </div>
                  </div>
                  <div className="game__optionsWrapper">
                    <h3 className="game__sysTittle">Процессор</h3>
                    {props[0].cpu == "None" ? (
                      <span className="game__sysDesc">Данные остутсвуют</span>
                    ) : (
                      <span className="game__sysDesc">{props[0].cpu}</span>
                    )}
                  </div>
                  <div className="game__optionsWrapper">
                    <h3 className="game__sysTittle">Видеокарта</h3>
                    {props[0].videocard == "None" ? (
                      <span className="game__sysDesc">Данные остутсвуют</span>
                    ) : (
                      <span className="game__sysDesc">
                        {props[0].videocard}
                      </span>
                    )}
                  </div>
                  <div className="game__secondWrapper">
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">Память</h3>
                      {props[0].ram == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">{props[0].ram}</span>
                      )}
                    </div>
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">Место на диске</h3>
                      {props[0].freespace == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">
                          {props[0].freespace}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="game__systemWrapper">
                  <div className="game__secondWrapper">
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">DirectX</h3>
                      {props[1].directx == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">
                          {props[1].directx}
                        </span>
                      )}
                    </div>
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">ОС</h3>
                      {props[1].os == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">{props[1].os}</span>
                      )}
                    </div>
                  </div>
                  <div className="game__optionsWrapper">
                    <h3 className="game__sysTittle">Процессор</h3>
                    {props[1].cpu == "None" ? (
                      <span className="game__sysDesc">Данные остутсвуют</span>
                    ) : (
                      <span className="game__sysDesc">{props[1].cpu}</span>
                    )}
                  </div>
                  <div className="game__optionsWrapper">
                    <h3 className="game__sysTittle">Видеокарта</h3>
                    {props[1].videocard == "None" ? (
                      <span className="game__sysDesc">Данные остутсвуют</span>
                    ) : (
                      <span className="game__sysDesc">
                        {props[1].videocard}
                      </span>
                    )}
                  </div>
                  <div className="game__secondWrapper">
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">Память</h3>
                      {props[1].ram == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">{props[1].ram}</span>
                      )}
                    </div>
                    <div className="game__optionsWrapper game__slice">
                      <h3 className="game__sysTittle">Место на диске</h3>
                      {props[1].freespace == "None" ? (
                        <span className="game__sysDesc">Данные остутсвуют</span>
                      ) : (
                        <span className="game__sysDesc">
                          {props[1].freespace}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="game__right">
              <h1 className="game__tittle">{props[0].title}</h1>
              <img
                src={props[0].img_url}
                alt="Изображение игры"
                className="game__gameImgTwo"
              />
              <div className="game__wrapperShop">{gameShop}</div>
              <div className="game__textWrapper">
                <h3 className="game__descTittle">Описание</h3>
                <p className="game__descText">{props[0].description}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default GamePage;
