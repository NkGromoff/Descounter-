import { gamesReqCreator, instance } from "./api";

export const gamesAPI = {
  async getGames(price, date, priceRange, dateRange, genre, isDesc, games, term) {
    let ss = gamesReqCreator("games", null);
    return ss(price, date, priceRange, dateRange, genre, isDesc, games, term).then((res) => res.data);
  },
  getGame(id) {
    return instance.get("games/name/" + id).then((res) => res.data);
  },
  getGameShop(id) {
    return instance.get("games/name/market/" + id).then((res) => res.data);
  },
  getAllGenre() {
    return instance.get("games/allGenre").then((res) => res.data);
  },
  updateGame(id, name, desc, date) {
    return instance
      .put(
        "games/adminChange",
        {
          id,
          name,
          desc,
          date,
        },
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((res) => res.data);
  },
};
