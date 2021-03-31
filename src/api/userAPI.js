import { instance, gamesReqCreator } from "./api";

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
    return ss(price, date, priceRange, dateRange, genre, isDesc, games, term).then((res) => res.data);
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
    return instance
      .post("auth/avatar", file, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  },

  async updateMenuSettings(genre) {
    genre = genre.join(", ");
    return instance
      .put(
        "auth/userSettings/Menu",
        { genre: genre },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => res.data);
  },
};
