import React, { useContext, useEffect, useState } from "react";
import "../styles/Menu.scss";
// import News from ".../public/images/News.png"
import Home from "./assets/icons/Home.png";
import General from "./assets/News.svg";
import Bussines from "./assets/briefcase.svg";
import Health from "./assets/Health.svg";
import Science from "./assets/Group2.svg";
import Sports from "./assets/Sports.svg";
import Technology from "./assets/TV-Guide.svg";
import { MdFavorite } from "react-icons/md";

export const Context = React.createContext([]);

const Menu = ({
  active,
  setActive,
  setCategory,
  category,
  setSearchTerm,
  menu,
  setMenu,
}) => {
  //ARRAY OF CATEGORYS
  const links = [
    { id: 1, name: "Home", value: "general", img: Home },
    { id: 2, name: "General", value: "general", img: General },
    { id: 3, name: "Business", value: "business", img: Bussines },
    { id: 4, name: "Health", value: "health", img: Health },
    { id: 5, name: "Science", value: "science", img: Science },
    { id: 6, name: "Sports", value: "sports", img: Sports },
    { id: 7, name: "Technology", value: "technology", img: Technology },
  ];

  //BOOKMARK OBJECT
  const bookmark = {
    id: 8,
    name: "Favorites",
    value: category,
  };

  //HANDLING DATA OF CATEGORY
  const [data, setData] = useState(links);

  const setDataEvent = (data) => {
    setData(data);
  };
  const value = { data, setDataEvent };

  //ON CATEGORY ICON CLICK 
  const onClick = (id, value) => {
    setActive(id);
    setCategory(value);
    setSearchTerm(" ");
    setMenu(false);
  };

  return (
    <div>
      {/* DESKTOP MENU */}
      <div className={menu === true ? "hide" : "menu-container"}>
        {/* ALL CATEGORYS */}
        <ul>
          {/* CATEGORYS */}
          {links.map((link) => (
            <div className={ active === link.id ? "active positioning" : " positioning inactive"}>
              <li
                key={link.id}
                className={
                  active === link.id //check is it active
                    ? "li-items text color-change"
                    : "li-items text inactive-color"
                }
                onClick={() => onClick(link.id, link.value)}
              >
                {/* MENU ITEM */}
                <div className="mini-card">
                  <img src={link.img} alt={link.name} />
                  <h3 className="text">{link.name}</h3>
                </div>
              </li>
            </div>
          ))}

          {/* BOOKMARK CATEGORY */}
          <div className={active === bookmark.id ? "active" : "inactive"}>
            <li
              className={
                active === bookmark.id //check is it active
                  ? "li-items text color-change"
                  : "li-items text inactive-color"
              }
              onClick={() => onClick(bookmark.id, bookmark.value)}
            >
              {/* BOOKMARK ITEM */}
              <MdFavorite className="favorite-bookmark-icon" />
              <h3 className="text">{bookmark.name}</h3>
            </li>
          </div>
        </ul>
      </div>

      {/* MOBILE MENU */}
      <div className={menu === true ? "grid-menu-container" : "hide"}>
        {links.map((link) => (
          <div className={active === link.id ? "active" : "inactive"}>
            <li
              key={link.id}
              className={
                active === link.id
                  ? "li-items text color-change"
                  : "li-items text inactive-color"
              }
              onClick={() => onClick(link.id, link.value)}
            >
              <div className="mini-card">
                <img src={link.img} alt={link.name} />
                {link.name}
              </div>
            </li>
          </div>
        ))}

        {/* MOBILE BOOKMARK */}
        <div className={active === bookmark.id ? "active positioning " : "inactive positioning "}>
          <li
            className={
              active === bookmark.id //check is it active
                ? "li-items text color-change"
                : "li-items text inactive-color"
            }
            onClick={() => onClick(bookmark.id, bookmark.value)}
          >
            {/* BOOKMARK ITEM */}
            <MdFavorite className="favorite-bookmark-icon" />
            {bookmark.name}
          </li>
        </div>
      </div>
    </div>
  );
};

export default Menu;
