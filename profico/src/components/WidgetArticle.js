import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WidgetArticle.scss";

const WidgetArticle = (props, article) => {
  //data formating
  const date = props.article.pub_date;
  const formatTime = date.substring(11, 16);

  return (
    //WIDGET ARTICLE
    <Link to={props.article.web_url} className="widget-article-container">
      <div className="items">
        {/* WIDGET ARTICLE TIME */}
        <h4 className="widget-article-time">{formatTime}</h4>

        {/* WIDGET ARTICLE TITLE */}
        <h2
          className={
            props.article.headline.main < 42
              ? "widget-article-title expand"
              : "widget-article-title"
          }
        >
          {props.article.headline.main}
        </h2>

        {/* WIDGET ARTICLE UNDERLINE */}
        <div className="under-line"> </div>
      </div>
    </Link>
  );
};

export default WidgetArticle;
