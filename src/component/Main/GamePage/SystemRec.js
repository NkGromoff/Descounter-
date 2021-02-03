import React, { useState } from "react";

export const SystemRec = (props) => {
  const [systemRec, setSystemRec] = useState(false);
  let onClickSetSystemRec = (e) => {
    if (e.target.classList.contains("game__buttonSystem--active")) return;
    if (systemRec) setSystemRec(false);
    else setSystemRec(true);
  };
  return (
    <>
      <h2 className="game__systemTittle">Системные требования</h2>
      <div className="game__buttonWrapper">
        <button
          onClick={onClickSetSystemRec}
          className={`game__buttonSystem buttonSystem ${!systemRec ? "game__buttonSystem--active" : ""}`}
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
            className={`game__buttonSystem buttonSystem ${systemRec ? "game__buttonSystem--active" : ""}`}
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
                <span className="game__sysDesc">{props[0].directx}</span>
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
              <span className="game__sysDesc">{props[0].videocard}</span>
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
                <span className="game__sysDesc">{props[0].freespace}</span>
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
                <span className="game__sysDesc">{props[1].directx}</span>
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
              <span className="game__sysDesc">{props[1].videocard}</span>
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
                <span className="game__sysDesc">{props[1].freespace}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
