import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import image from "../../../image/banner-img.jpg";

function Banners(props) {
  return (
    <>
      <section className="banners">
        <div className="container">
          <h1 className="banners__tittle">Горячие скидки</h1>
        </div>
        <div className="banners__wrapper">
          <div className="banners__inner">
            <Swiper spaceBetween={25} slidesPerView={2} centeredSlides={true}>
              <SwiperSlide>
                <a href="#" className="banners__innerItem">
                  <img
                    src={image}
                    alt="Изображение слайдера"
                    className="banners__img"
                  />
                  <div className="banners__textWrapper">
                    <h2 className="banners__itemTittle">Cyberpunk 2077</h2>
                    <span className="banners__price">От 1500 ₽</span>
                  </div>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="banners__innerItem">
                  <img
                    src={image}
                    alt="Изображение слайдера"
                    className="banners__img"
                  />
                  <div className="banners__textWrapper">
                    <h2 className="banners__itemTittle">Cyberpunk 2077</h2>
                    <span className="banners__price">От 1500 ₽</span>
                  </div>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="banners__innerItem">
                  <img
                    src={image}
                    alt="Изображение слайдера"
                    className="banners__img"
                  />
                  <div className="banners__textWrapper">
                    <h2 className="banners__itemTittle">Cyberpunk 2077</h2>
                    <span className="banners__price">От 1500 ₽</span>
                  </div>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="banners__innerItem">
                  <img
                    src={image}
                    alt="Изображение слайдера"
                    className="banners__img"
                  />
                  <div className="banners__textWrapper">
                    <h2 className="banners__itemTittle">Cyberpunk 2077</h2>
                    <span className="banners__price">От 1500 ₽</span>
                  </div>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="banners__innerItem">
                  <img
                    src={image}
                    alt="Изображение слайдера"
                    className="banners__img"
                  />
                  <div className="banners__textWrapper">
                    <h2 className="banners__itemTittle">Cyberpunk 2077</h2>
                    <span className="banners__price">От 1500 ₽</span>
                  </div>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="banners__innerItem">
                  <img
                    src={image}
                    alt="Изображение слайдера"
                    className="banners__img"
                  />
                  <div className="banners__textWrapper">
                    <h2 className="banners__itemTittle">Cyberpunk 2077</h2>
                    <span className="banners__price">От 1500 ₽</span>
                  </div>
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banners;
