import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import photoImg from "../../../image/profileImg.png";
import { getGames, getGamesUserMore, SetUsersMainGenre, uploadAvatar } from "../../../redux/UserReduser";
import GamesDisplay from "../../shared/gamesDisplay";
import { formatDate } from "../../shared/generalDataForGame";
import { Genre } from "../../shared/Genre";

const Profile = React.memo((props) => {
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.UserReduser.isAuth);

    const user = useSelector((state) => state.UserReduser.user);

    const filter = useSelector((state) => state.UserReduser.filter);

    const allCount = useSelector((state) => state.UserReduser.allCount);

    const mainGenre = useSelector((state) => state.UserReduser.mainGenre);

    const games = useSelector((state) => state.UserReduser.games);

    const allGames = useSelector((state) => state.UserReduser.gamesWithoutFilter);

    const genre = useSelector((state) => state.AppReduser.genre);

    const userSettings = useSelector((state) => state.UserReduser.userSettings);

    let genreItem = null;
    const avatarImg = user.avatar ? "https://descounter.ru:8000/" + user.avatar : photoImg;
    const [state, setState] = useState({
        years: 0,
        prices: "",
        filterPrice: "",
        filterNewDate: "",
        isDesc: false,
        genre: [],
        isGamesMore: false,
        term: null,
    });

    const uploadAvatarEvent = (e) => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    };

    const childProps = (years, prices, filterPrice, filterNewDate, isDesc, genre, isGamesMore, term) => {
        setState({
            years: years,
            prices: prices,
            filterPrice: filterPrice,
            filterNewDate: filterNewDate,
            isDesc: isDesc,
            genre: genre,
            isGamesMore: isGamesMore,
            term: term,
        });
    };

    const favGenre = () => {
        let genreObj = {};
        let mainGnere;
        let max = 0;
        if (allGames.length !== 0) {
            allGames.map((e) => {
                if (e.tag_game in genreObj) {
                    genreObj[e.tag_game]++;
                } else {
                    genreObj[e.tag_game] = 1;
                }
            });
            for (let key in genreObj) {
                max = Math.max(genreObj[key], max);
                mainGnere = Object.keys(genreObj).filter((v) => genreObj[v] === max);
            }
            dispatch(SetUsersMainGenre(mainGnere));
        } else if (allGames.length === 0) {
            dispatch(SetUsersMainGenre("Отсутствует"));
        }
    };

    useEffect(() => {
        if (state.years !== 0) dispatch(getGames(state.filterPrice, state.filterNewDate, state.prices, state.years, state.genre, state.isDesc, null, state.term, user.id));
    }, [state.filterPrice, state.filterNewDate, state.genre, state.isDesc, state.years, state.prices, state.term, user.id]);

    useEffect(() => {
        let gameslength = games.length;
        let count = filter.count;
        if (state.isGamesMore == true && count && gameslength && gameslength < count) {
            dispatch(getGamesUserMore(state.filterPrice, state.filterNewDate, state.prices, state.years, state.genre, state.isDesc, gameslength, count, state.term, user.id));
        }
    }, [state.isGamesMore, filter.count]);
    useEffect(() => {
        favGenre();
    }, [allGames]);

    if (genre) {
        genreItem = genre.map((i) => <Genre key={i.id} id={i.id} name={i.name} genre={genre} userGenre={userSettings.userMenu} />);
    }
    if (!isAuth) return <Redirect to="/Login" />;
    return (
        <>
            <Helmet>
                <title>Descounter - профиль</title>
            </Helmet>
            <div className="container">
                <section className="profile">
                    <div className="profile__wrapper">
                        <div className="profile__wrapperTop">
                            <div className="profile__leftSide">
                                <div className="profile__avtarWrapper">
                                    <div className="profile__imgWraper">
                                        <img src={avatarImg} alt="Изображение профиля" className="profile__image" />
                                        <label onChange={uploadAvatarEvent} className="profile__fileuploadWrapper">
                                            <input accept="image/*" className="profile__fileupload" type="file" name="file" id="" />
                                            <span className="profile__fileText">Изменить</span>
                                        </label>
                                    </div>
                                    <div className="profile__dateRegWrapper">
                                        <span className="profile__dateRegSpan">Дата регистрации:</span>
                                        <span className="profile__dateReg">{formatDate(new Date(user.data_created))}</span>
                                    </div>
                                </div>
                                <div className="profile__textInfoAllWrapper">
                                    <div className="profile__textInfoWrapper">
                                        <h2 className="profile__tittle">{user.username}</h2>
                                    </div>
                                    <div className="profile__textInfoWrapper">
                                        <span className="profile__textInfoSpan">Всего игр:</span>
                                        <span className="profile__textInfoSpanDark">{allCount}</span>
                                    </div>
                                    <div className="profile__textInfoWrapper">
                                        <span className="profile__textInfoSpan">Любимый жанр:</span>
                                        <span className="profile__textInfoSpanDark">{Array.isArray(mainGenre) ? mainGenre.join(", ") : mainGenre}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="profile__rightSide">
                                <h2 className="profile__settingTitle">Настройки главного меню</h2>
                                <div className="profile__menuSetting">
                                    <h3 className="profile__settingTitleSub">Выберете жанры</h3>
                                    <div className="profile__menuItemWrapper">{genreItem}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <GamesDisplay childProps={childProps} games={games} />
        </>
    );
});

export default Profile;
