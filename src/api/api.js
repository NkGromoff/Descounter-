import * as axios from "axios";

export const instance = axios.create({
  baseURL: "https://descounter.ru:8000/api", // baseURL: "https://descounter.ru:8000/api",baseURL: "http://localhost:3000/api"
});

export let gamesReqCreator = (urlReq, id = 0) => (price, date, priceRange, dateRange, genre, isDesc, games, term) => {
  if ((priceRange[0] === 0 && priceRange[1] === 9999) || (priceRange[0] === "0" && priceRange[1] === "9999")) {
    priceRange = null;
  }
  if ((dateRange[0] === 1997 && dateRange[1] === 2021) || (dateRange[0] === "1997" && dateRange[1] === "2021")) {
    dateRange = null;
  }

  if (term) {
    term = term.replace(/"/g, "");
    term = term.trim();
  }
  if (genre.length == 0 || !genre) genre = null;
  if (games == null) games = 0;
  return instance.get(
    `${urlReq}${
      price == "none" &&
      date == "none" &&
      id == null &&
      dateRange == null &&
      priceRange == null &&
      genre == null &&
      games === null &&
      term == null &&
      isDesc !== true
        ? ``
        : `?`
    }${price == "priceDown" || price == "priceUp" ? `price=${price}` : ``}${
      date == "dateDown" || date == "dateUp" ? `&date=${date}` : ``
    }${priceRange && priceRange !== "" ? `&priceRange=${priceRange}` : ``}${
      dateRange && dateRange !== "" ? `&dateRange=${dateRange}` : ``
    }${genre ? `&genre=${genre}` : ``}${isDesc == true ? `&isDesc=${isDesc}` : ``}&games=${games}${
      term && term !== "" ? `&term=${term}` : ``
    }${id && id !== 0 ? `&id=${id}` : ``}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};
