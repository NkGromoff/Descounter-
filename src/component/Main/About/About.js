import React from "react";
import steamBuyImg from "../../../image/steamBuy.svg";
import steamPayImg from "../../../image/steampay.svg";
import steamAccImg from "../../../image/steam-account.svg";
import zakazakaImg from "../../../image/zakazaka.svg";
import gamerayImg from "../../../image/gameray.svg";
import gamazavrImg from "../../../image/gamazavr.svg";
import { Helmet } from "react-helmet";

function About(props) {
  return (
    <>
      <div className="container">
        <section className="about">
          <div className="about__wrapper">
            <h1 className="about__tittle">{props.title}</h1>
            {props.title === "О нас" ? (
              <>
                <Helmet>
                  <title>Descounter - О нас</title>
                </Helmet>
                <p className="about__text">
                  Descounter – является агрегатором цен и скидок на игры представленные в магазинах. Цены обновляются
                  несколько раз в сутки Каждая игра снабжена подробным описанием, системными требованиями и лучшими
                  ценами.
                </p>
                <p className="about__text">
                  Все магазины, представленные в каталоге, прошли проверку (осуществлялись тестовые покупки, изучалась
                  информация и гарантии. Descounter не является посредником в покупке, это лишь сервис, удобный способ
                  найти самое выгодное предложение. Покупка осуществляется на сайте магазина. Всегда будьте внимательны
                  и уточняйте условия покупки, цену и комплектацию у выбранного вами продавца
                </p>
                <h2 className="about__tittle about__subTitle">Мы сотрудничаем</h2>
                <div className="about__wrapperShops">
                  <a href="https://steam-account.ru/about.php" className="about__shops">
                    <img src={steamAccImg} alt="Изображение магазина" className="about__shopsImg" />
                  </a>
                  <a href="https://steambuy.com/about_us.php" className="about__shops">
                    <img src={steamBuyImg} alt="Изображение магазина" className="about__shopsImg" />
                  </a>
                  <a href="https://steampay.com/about" className="about__shops">
                    <img src={steamPayImg} alt="Изображение магазина" className="about__shopsImg" />
                  </a>
                  <a href="https://zaka-zaka.com/faq/warranty/" className="about__shops">
                    <img src={zakazakaImg} alt="Изображение магазина" className="about__shopsImg" />
                  </a>
                  <a href="https://www.gameray.ru/about/" className="about__shops">
                    <img src={gamerayImg} alt="Изображение магазина" className="about__shopsImg" />
                  </a>
                  <a href="https://gamazavr.ru/about/" className="about__shops">
                    <img src={gamazavrImg} alt="Изображение магазина" className="about__shopsImg" />
                  </a>
                </div>
              </>
            ) : (
              <>
                <Helmet>
                  <title>Descounter - Соглашение</title>
                </Helmet>
                <p className="about__text">
                  Descounter — является агрегатором цен и скидок на игры. Он не является интернет-магазином и не
                  участвует в процессе купли-продажи товаров. Сервис не выступает гарантом в сделках, а лишь
                  предоставляет информацию об играх и ценах в своем каталоге. Интернет-магазин может изменить
                  комплектацию, цену или другие характеристики товара без предупреждения сервиса. Всегда уточняйте
                  условия покупки на сайте выбранного вами продавца. Читайте информацию о магазине и его гарантии.
                </p>
                <p className="about__text">
                  Будьте внимательны: многие товары имеют территориальные ограничения (активировать их можно только на
                  территориях ограниченного списка стран), требуют подключение к интернету, установку или покупку
                  дополнительного ПО (Steam, OS Windows и т.д.), а также оборудования (игровые приставки, компьютерное
                  комплектующие и т.д.), регистрацию в дополнительных сервисах, имеют ограниченный список поддерживаемых
                  языков или требуют дополнительные соглашения со стороны покупателя. С любыми вопросами или
                  предложениями вы можете обратиться в службу поддержки suppot@descounter.ru
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
