import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const gamesAPI = {
  getGames(
    price,
    date,
    leftPrice,
    rightPrice,
    dateRange,
    genre,
    isDesc,
    games
  ) {
    if (leftPrice === 0 && rightPrice === 9999) {
      leftPrice = null;
      rightPrice = null;
    }
    if (dateRange[0] === 1997 && dateRange[1] === 2021) {
      dateRange = null;
    }
    if (genre.length == 0) genre = null;
    if (games == null) games = 0;
    return instance.get(
      `games${
        price == "none" &&
        date == "none" &&
        leftPrice == null &&
        rightPrice == null &&
        dateRange == null &&
        genre == null &&
        games === null &&
        isDesc !== true
          ? ``
          : `?`
      }${price == "priceDown" || price == "priceUp" ? `price=${price}` : ``}${
        date == "dateDown" || date == "dateUp" ? `&date=${date}` : ``
      }${
        leftPrice !== null || rightPrice !== null
          ? `&leftPrice=${leftPrice}&rightPrice=${rightPrice}`
          : ``
      }${dateRange !== null ? `&dateRange=${dateRange}` : ``}${
        genre !== null ? `&genre=${genre}` : ``
      }${isDesc == true ? `&isDesc=${isDesc}` : ``}&games=${games}`
    );
  },
  getGame(id) {
    return instance.get("games/name/" + id);
  },
  getGameShop(id) {
    return instance.get("games/name/market/" + id);
  },
};
