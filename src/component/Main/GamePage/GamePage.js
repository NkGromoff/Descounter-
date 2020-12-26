import React from "react";

function GamePage() {
  return (
    <>
      <div class="container">
        <section class="game">
          <div class="game__wrapper">
            <div class="game__left">
              <img
                src="image/item-img.jpg"
                alt="Изображение игры"
                class="game__gameImg"
              />

              <h2 class="game__systemTittle">Системные требования</h2>
              <div class="game__buttonWrapper">
                <button
                  class="game__buttonSystem buttonSystem game__buttonSystem--active"
                  data-system="min"
                >
                  Минимальные
                </button>
                <button
                  class="game__buttonSystem buttonSystem"
                  data-system="rec"
                >
                  Рекомендуемые
                </button>
              </div>
              <div class="game__systemWrapper">
                <div class="game__secondWrapper">
                  <div class="game__optionsWrapper game__slice">
                    <h3 class="game__sysTittle">DirectX</h3>
                    <span class="game__sysDesc">DirectX 12</span>
                  </div>
                  <div class="game__optionsWrapper game__slice">
                    <h3 class="game__sysTittle">ОС</h3>
                    <span class="game__sysDesc">
                      Windows 10 (только 64-разрядные версии)
                    </span>
                  </div>
                </div>
                <div class="game__optionsWrapper">
                  <h3 class="game__sysTittle">Процессор</h3>
                  <span class="game__sysDesc">
                    Ryzen 3 1200 с частотой 3,1 ГГц / i5-4460 с частотой 3,2 ГГц
                  </span>
                </div>
                <div class="game__optionsWrapper">
                  <h3 class="game__sysTittle">Видеокарта</h3>
                  <span class="game__sysDesc">
                    AMD R9 380 с 4 ГБ видеопамяти / GeForce GTX 960 с 4 ГБ
                    видеопамяти
                  </span>
                </div>
                <div class="game__secondWrapper">
                  <div class="game__optionsWrapper game__slice">
                    <h3 class="game__sysTittle">Память</h3>
                    <span class="game__sysDesc">8 ГБ </span>
                  </div>
                  <div class="game__optionsWrapper game__slice">
                    <h3 class="game__sysTittle">Место на диске</h3>
                    <span class="game__sysDesc">50 ГБ</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="game__right">
              <h1 class="game__tittle">assassin's creed valhalla</h1>
              <img
                src="image/item-img.jpg"
                alt="Изображение игры"
                class="game__gameImgTwo"
              />
              <div class="game__wrapperShop">
                <a class="game__shopCart" href="#">
                  <img
                    src="image/zakazaka-logo.png"
                    alt="Изображение магазина"
                    class="game__shopImg"
                  />
                  <div class="game__priceWrapper">
                    <span class="game__priceNow">1500 ₽</span>
                  </div>
                </a>
                <a class="game__shopCart" href="#">
                  <img
                    src="image/steamBuy.png"
                    alt="Изображение магазина"
                    class="game__shopImg"
                  />
                  <div class="game__priceWrapper">
                    <span class="game__pricePrev">1000 ₽</span>
                    <span class="game__priceNow">1500 ₽</span>
                  </div>
                  <span class="game__numDesc">10%</span>
                </a>
                <a class="game__shopCart" href="#">
                  <img
                    src="image/zakazaka-logo.png"
                    alt="Изображение магазина"
                    class="game__shopImg"
                  />
                  <div class="game__priceWrapper">
                    <span class="game__priceNow">1500 ₽</span>
                  </div>
                </a>
                <a class="game__shopCart" href="#">
                  <img
                    src="image/steamBuy.png"
                    alt="Изображение магазина"
                    class="game__shopImg"
                  />
                  <div class="game__priceWrapper">
                    <span class="game__pricePrev">1000 ₽</span>
                    <span class="game__priceNow">1500 ₽</span>
                  </div>
                  <span class="game__numDesc">10%</span>
                </a>
                <a class="game__shopCart" href="#">
                  <img
                    src="image/zakazaka-logo.png"
                    alt="Изображение магазина"
                    class="game__shopImg"
                  />
                  <div class="game__priceWrapper">
                    <span class="game__priceNow">1500 ₽</span>
                  </div>
                </a>
                <a class="game__shopCart" href="#">
                  <img
                    src="image/steamBuy.png"
                    alt="Изображение магазина"
                    class="game__shopImg"
                  />
                  <div class="game__priceWrapper">
                    <span class="game__pricePrev">1000 ₽</span>
                    <span class="game__priceNow">1500 ₽</span>
                  </div>
                  <span class="game__numDesc">10%</span>
                </a>
              </div>
              <div class="game__textWrapper">
                <h3 class="game__descTittle">Описание</h3>
                <p class="game__descText">
                  Вам предстоит пройти путь к славе, сыграв за легендарного
                  викинга. Нападайте на врагов, развивайте селение и усиливайте
                  влияние.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default GamePage;
