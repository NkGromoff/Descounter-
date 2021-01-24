import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IconsPl } from "../../shared/generalDataForGame";

function MainCarts(props) {
  const [isFliped, setIsFliped] = useState(false);
  const cartRef = useRef();
  let onHover = (e) => {};
  let onLeave = () => {};
  useEffect(() => {
    if (props.idForFlip == props.id) {
      setIsFliped((prev) => !prev);
    }
  }, [props.idForFlip]);
  return (
    <>
      <div className="gameGallery__itemWrapper">
        <div
          data-id={props.id}
          onMouseMove={onHover}
          onMouseLeave={onLeave}
          ref={cartRef}
          className={`gameGallery__item ${isFliped ? `gameGallery__item--fliped` : ``}`}
        >
          <NavLink to={"/GamePage/" + props.id} className="gameGallery__frontGame gameGallery__game">
            <img src={props.img} alt="изображение игры" className="gameGallery__imageItem" />
            <div className="gameGallery__descWrapper">
              <span className="gameGallery__descText">{props.amountDesc}%</span>
            </div>
            <div className="gameGallery__frontText gameGallery__frontBackText">
              <div className="gameGallery__iconWrapper">
                <IconsPl platformId={props.platform_id} />
              </div>
              <span className="gameGallery__text">От {props.price} ₽</span>
            </div>
          </NavLink>
          <NavLink to={"/GamePage/" + props.idBack} className="gameGallery__backGame gameGallery__game">
            <img src={props.imgBack} alt="изображение игры" className="gameGallery__imageItem" />
            <div className="gameGallery__descWrapper">
              <span className="gameGallery__descText">{props.amountDescBack}%</span>
            </div>
            <div className="gameGallery__backText gameGallery__frontBackText">
              <div className="gameGallery__iconWrapper">
                <IconsPl platformId={props.platform_id} />
              </div>
              <span className="gameGallery__text">От {props.priceBack} ₽</span>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default MainCarts;
