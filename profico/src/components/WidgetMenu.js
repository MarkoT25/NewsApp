import React from "react";
import "../styles/WidgetMenu.scss";

const WidgetMenu = ({ mobileNews, setMobileNews, menu }) => {
  //function to show featured articles
  const showFeatured = () => {
    setMobileNews(false);
  };
  //function to show latestnews
  const showLatest = () => {
    setMobileNews(true);
  };
  return (
    // WIDGET MENU
    <div className={menu === true ? "hide" : "titles"}>
      {/* SELECTED FEATURED */}
      <h3
        className={mobileNews === false ? "active featured" : "featurd"}
        onClick={showFeatured}
      >
        Featured
      </h3>
      {/* SELECTED LATEST */}
      <h3
        className={mobileNews === true ? "active latest " : "latest"}
        onClick={showLatest}
      >
        Latest
      </h3>
    </div>
  );
};

export default WidgetMenu;
