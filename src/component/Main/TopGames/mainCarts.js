import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IconsPl } from "../../shared/generalDataForGame";

function MainCarts(props) {
  const [isFliped, setIsFliped] = useState(false);
  const cartRef = useRef();
  let onHover = (e) => {};
  let onLeave = () => {};

  const onFlip = () =>{
    setIsFliped((prev) => !prev);
  }


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
        <button className="gameGallery__refresh" onClick={onFlip}>
              <svg version="1.1" id="Capa_1" 
                viewBox="0 0 489.533 489.533">
              <g>
                <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9
                  l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
                  c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6
                  C49.575,418.961,150.875,501.261,268.175,488.161z"/>
              </g>
              </svg>
            </button>
      </div>
    </>
  );
}

export default MainCarts;
