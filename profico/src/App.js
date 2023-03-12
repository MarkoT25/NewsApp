import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import Adbar from "./components/Adbar";
import Header from "./components/Header";
import Menu from "./components/Menu";
import NewsGrid from "./components/NewsGrid";
import WidgetMenu from "./components/WidgetMenu";

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState(false);
  const [mobileNews, setMobileNews] = useState(false);
  const [allFavs, setAllFavs] = useState([]);
  const [showAd, setShowAd] = useState(true);

  // API INFO
  const apiKey = "e69918858fce43f5b99113afee9b3e28";
  const url = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&country=us&category=${category}&apiKey=${apiKey}&sortBy=publishedAt&order=desc`;

  //FETCH FROM API
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //setting isFav argument to object
        const updatedItems = { ...data };
        updatedItems.articles.forEach((object) => {
          object.isFav = false;
        });
        setItems(updatedItems.articles);
      });
  }, [category, searchTerm]);

  //FILTER isFav ARTICLES
  const newObjects = items.filter((item) => item.isFav === true);

  //CHECK FOR OBJECTS WITH SAME TITLES
  newObjects.forEach((newObject) => {
    const check = allFavs.some(
      (favObject) => favObject.title === newObject.title
    );

    //ADDING OBJECT TO allFavs LIST
    if (!check) {
      allFavs.push(newObject);
    }
  });

  //SEND OBJECTS FROM ALLFAVS TO ITEMS WITH SAME STATES (they keep isFav === true)
  allFavs.forEach((fav) => {
    const index = items.findIndex((item) => item.title === fav.title);
    if (index !== -1) {
      items[index] = fav;
    }
  });

  //DELETING OBJECT FROM LIST
  allFavs.forEach((object) => {
    const index = allFavs.findIndex((f) => !f.isFav);
    if (index !== -1) {
      items[index] = object;
      allFavs.splice(index, 1);
    }
  });

  //DELETE LAST FROM OBJECT FROM AN ARRAY IF IS FALSE
  if (allFavs.length === 1 && allFavs[0].isFav === false) {
    allFavs.pop();
  }

  //REMOVE DUPLICATES FROM ITEMS ARRAY
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j]) {
        items.splice(j, 1);
        j--;
      }
    }
  }

  //handling info from search filter
  const handleSearch = (dt) => {
    setSearchTerm(dt);
  };

  return (
    <div className="App">
      <Adbar showAd={showAd} setShowAd={setShowAd} />
      <Header
        handleSearch={handleSearch}
        setItems={setItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        menu={menu}
        setMenu={setMenu}
        showAd={showAd}
      />
      <WidgetMenu
        mobileNews={mobileNews}
        setMobileNews={setMobileNews}
        menu={menu}
      />
      <div className="grid">
        <Menu
          active={active}
          setActive={setActive}
          setCategory={setCategory}
          category={category}
          setSearchTerm={setSearchTerm}
          menu={menu}
          setMenu={setMenu}
        />
        {/* TITLE */}
        <h3 className={menu === true ? "hide" : "title3"}>News</h3>

        <NewsGrid
          items={items}
          category={category}
          active={active}
          setActive={setActive}
          setCategory={setCategory}
          menu={menu}
          mobileNews={mobileNews}
          allFavs={allFavs}
        />
      </div>
    </div>
  );
}

export default App;
