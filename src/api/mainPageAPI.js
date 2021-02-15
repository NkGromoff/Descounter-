import { instance } from "./api";

export const mainPageAPI = {
  getGames() {
    return instance.get("games/MainPage").then((res) => res.data);
  },
  getGamesGenre(genre) {
    return instance.get(`games/GenreMainPage?genre=${genre}`).then((res) => res.data);
  },
};
