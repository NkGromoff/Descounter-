import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

let gamesReqCreator = (urlReq, id = 0) => (price, date, priceRange, dateRange, genre, isDesc, games, term) => {
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

export const gamesAPI = {
  async getGames(price, date, priceRange, dateRange, genre, isDesc, games, term) {
    let ss = gamesReqCreator("games", null);
    return await ss(price, date, priceRange, dateRange, genre, isDesc, games, term);
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
  updateGame(id, name, desc, date) {
    return instance.put(
      "games/adminChange",
      {
        id,
        name,
        desc,
        date,
      },
      { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  },
};

export const userAPI = {
  setUser(login, email, password, passwordTwo) {
    return instance.post("auth/registration", {
      login: login,
      email: email,
      password: password,
      passwordTwo: passwordTwo,
    });
  },

  login(login, password, isRemember) {
    return instance.post("auth/login", {
      login: login,
      password: password,
      isRemember: isRemember,
    });
  },

  auth() {
    return instance.get("auth/loginAuth", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },

  async getGames(price, date, priceRange, dateRange, genre, isDesc, games, term, id) {
    let ss = gamesReqCreator("auth/games", id);
    return await ss(price, date, priceRange, dateRange, genre, isDesc, games, term);
  },
  async setGameForUser(userId, gameId) {
    return instance.post(
      "auth/games/insert",
      {
        gameId: gameId,
        userId: userId,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  },
  async setAvatarForUser(file) {
    return instance.post("auth/avatar", file, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
};

export const mainPageAPI = {
  getGames() {
    return instance.get("games/MainPage");
  },
  getGamesGenre(genre) {
    return instance.get(`games/GenreMainPage?genre=${genre}`);
  },
};
