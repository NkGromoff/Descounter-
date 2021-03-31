import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMenu } from "../../redux/UserReduser";
import { debounce } from "lodash";

export const Genre = (props) => {
  const [check, setCheck] = useState(false);
  const find = (e) => e == props.name;
  const isFetching = useSelector((state) => state.AllGamesReduser.isFetching);
  const dispatch = useDispatch();
  const checkUpd = debounce((e) => {
    let newGenreArray = null;
    if (props.userGenre) {
      newGenreArray = props.userGenre.find((i) => {
        if (i === e.target.value) {
          return i;
        }
      });
      if (newGenreArray) {
        newGenreArray = props.userGenre.filter((e) => e !== newGenreArray);
      } else {
        let newState = e.target.value;
        if (props.userGenre[0] === "") newGenreArray = [newState];
        else newGenreArray = [...props.userGenre, newState];
      }
    }

    dispatch(updateMenu(newGenreArray));
    setCheck((prev) => !prev);
  }, 100);
  useEffect(() => {
    if (props.genre && props.userGenre)
      if (props.userGenre.some(find)) {
        setCheck(true);
      }
  }, [props.userGenre]);
  return (
    <>
      <label className={`profile__genreSpan ${isFetching ? "profile__genreSpan--disable" : ""}`}>
        {props.name}
        <input
          value={props.name}
          type="checkbox"
          checked={check}
          onChange={checkUpd}
          className="gamesDisplay__genreCheck"
          disabled={isFetching}
        />
        <span className="checkBox checkBoxProfile"></span>
      </label>
    </>
  );
};
