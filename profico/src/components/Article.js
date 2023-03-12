import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Article.scss";
import blackImg from "./assets/black.png";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
//321x112

const Article = ({ item, active, setActive, setCategory}) => {
  const [fav, setFav] = useState(item.isFav);
  

  //TIME FORMATING
  const websiteURL = item.url;
  const websiteTitle = item.title;
  const date = item.publishedAt;
  const formatDate = date.replace("T", " ");
  const formatTime = formatDate.replace("Z", "");

  //STRING LIMIT FUNCTION
  function limit(string = "", limit = 0) {
    return string.substring(0, limit);
  }

  //ONCLICK SETTING ACTIVE ID AND CATEGORY
  const onClick = (id, value) => {
    setActive(id);
    setCategory(value);
  };

  //SET FAV STATE WHEN CATEGORY IS CHANGED
  useEffect(() => {
    if (item.isFav === false) {
      if (fav === true) {
        setFav(false);
      } else if (fav === false){
        setFav(false)
      }
    } else if (item.isFav === true) {
      if (fav === false) {
        setFav(true);
      } else if (fav === true){
        setFav(true)
      }
    }
  }, [active]);

  //handling favorite article
  const setFavorite = () => {
    if (item.isFav === false) {
      item.isFav = true;
      setFav(true);
    } else if (item.isFav === true) {
      item.isFav = false;
      setFav(false);
    }
  };
  

  //NEW CATEGORYS (CTG) LIST
  const ctg = [
    { id: 1, name: "Home", value: "general" },
    { id: 2, name: "General", value: "general" },
    { id: 3, name: "Business", value: "business" },
    { id: 4, name: "Health", value: "health" },
    { id: 5, name: "Science", value: "science" },
    { id: 6, name: "Sports", value: "sports" },
    { id: 7, name: "Technology", value: "technology" },
  ];

  return (
    //ARTICLE , show on favorites check
    <div className={active === 8 ? (fav === false ? 'hide' : 'article') : 'article'}> 
      {/* ARTICLE IMAGE */}
      <div to={item.url} className="image">
        {/* FAVORITE ICON */}
        {fav === false ? (
          <MdOutlineFavoriteBorder className="fav-icon" onClick={setFavorite} />
        ) : (
          <MdFavorite className="fav-icon" onClick={setFavorite} />
        )}

        {/* IMAGE */}
        <img
          className="pic"
          src={item.urlToImage === null ? blackImg : item.urlToImage}
          alt={item.title}
        />
      </div>

      {/* ARTICLE MASK */}
      <Link to={item.url} className="mask">
        {/* ARTICLE INFO */}
        <div className="info">
          {/* MAPING THROUGH CATEGORY LIST AND SETTING CATEGORY */}
          {ctg.map((c) => (
            <h5
              key={c.id}
              onClick={() => onClick(c.id, c.value)}
              className={active === c.id ? "category" : "hide"}
            >
              {c.value}
            </h5>
          ))}

          {/* ARTICLE INFO TEXT */}
          <h3 className="title">{limit(item.title, 100)}</h3>
          <h6 className="author">{item.author}</h6>
        </div>
      </Link>
    </div>
  );
};

export default Article;
