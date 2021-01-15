import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const gamesAPI = {
  getGames(price, date, priceRange, dateRange, genre, isDesc, games) {
    if (priceRange[0] === 0 && priceRange[1] === 9999) {
      priceRange = null;
    }
    if (dateRange[0] === 1997 && dateRange[1] === 2021) {
      dateRange = null;
    }

    if (genre.length == 0 || !genre) genre = null;
    if (games == null) games = 0;
    return instance.get(
      `games${
        price == "none" &&
        date == "none" &&
        dateRange == null &&
        priceRange == null &&
        genre == null &&
        games === null &&
        isDesc !== true
          ? ``
          : `?`
      }${price == "priceDown" || price == "priceUp" ? `price=${price}` : ``}${
        date == "dateDown" || date == "dateUp" ? `&date=${date}` : ``
      }${priceRange !== null ? `&priceRange=${priceRange}` : ``}${
        dateRange !== null ? `&dateRange=${dateRange}` : ``
      }${genre !== null ? `&genre=${genre}` : ``}${
        isDesc == true ? `&isDesc=${isDesc}` : ``
      }&games=${games}`
    );
  },
  getGame(id) {
    return instance.get("games/name/" + id);
  },
  getGameShop(id) {
    return instance.get("games/name/market/" + id);
  },
  getAllGenre() {
    return instance.get("games/allGenre");
  },

  getCountGames(price, date, priceRange, dateRange, genre, isDesc, games) {
    if (priceRange[0] === 0 && priceRange[1] === 9999) {
      priceRange = null;
    }
    if (dateRange[0] === 1997 && dateRange[1] === 2021) {
      dateRange = null;
    }
    if (genre.length == 0) genre = null;
    if (games == null) games = 0;
    return instance.get(
      `games/count${
        price == "none" &&
        date == "none" &&
        dateRange == null &&
        priceRange == null &&
        genre == null &&
        games === null &&
        isDesc !== true
          ? ``
          : `?`
      }${price == "priceDown" || price == "priceUp" ? `price=${price}` : ``}${
        date == "dateDown" || date == "dateUp" ? `&date=${date}` : ``
      }${priceRange !== null ? `&priceRange=${priceRange}` : ``}${
        dateRange !== null ? `&dateRange=${dateRange}` : ``
      }${genre !== null ? `&genre=${genre}` : ``}${
        isDesc == true ? `&isDesc=${isDesc}` : ``
      }&games=${games}`
    );
  },
};
