import React, { useState } from "react";
import "../styles/NewsGrid.scss";
import Article from "./Article";
import LatestNewsWidget from "./LatestNewsWidget";

const NewsGrid = ({
  items,
  active,
  setActive,
  setCategory,
  category,
  menu,
  mobileNews,
  allFavs,
}) => {
  return (
    <div>
      {/* NEWS GRID */}
      <div className={menu === true ? "hide" : "news-grid"}>
        {/* ARTICLES MAP */}
        {items.map((item, i) =>
          // LATEST NEWS WIDGET
          i === 2 ? (
            // CHECK FOR LATEST NEWS WIDGET
            <div
              className={
                active === 8
                  ? "hide"
                  : "widget" && active === 1
                  ? "widget"
                  : "hide"
              }
            >
              {" "}
              <LatestNewsWidget key={i} />
            </div>
          ) : (
            //ARTICLE
            <div
              className={
                mobileNews === true
                  ? "hide"
                  : "article-div" && active === 8
                  ? "hide"
                  : null
              }
            >
              <Article
                key={i}
                item={item}
                setCategory={setCategory}
                setActive={setActive}
                active={active}
              />
            </div>
          )
        )}

        {/* FAVORITES MAP */}
        <div className={active !== 8 ? "hide" : "fav-grid"}>
          {allFavs.map((item) => (
            <Article
              className="fav-grid"
              key={item.id}
              item={item}
              setCategory={setCategory}
              setActive={setActive}
              active={active}
            />
          ))}
        </div>

        {/* END OF NEWS GRID */}
      </div>

      {/* MOBILE LATEST NEWS */}
      <div
        className={
          mobileNews === false
            ? "hide"
            : "widget-show" && menu === true
            ? "hide"
            : "widget-show"
        }
      >
        <LatestNewsWidget />
      </div>
    </div>
  );
};

export default NewsGrid;
