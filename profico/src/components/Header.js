import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";

const Header = (props, { searchTerm, showAd }) => {
  let word = searchTerm;

  //SETTING SEARCH TERM FOR SEARCH FILTER
  const addValue = (event) => {
    props.setSearchTerm(word);
  };

  //FUNCTION TO OPEN OR CLOSE MOBILE MENU
  const openMobileMenu = () => {
    if (props.menu === false) {
      props.setMenu(true);
    } else {
      props.setMenu(false);
    }
  };
  return (
    //HEADER
    <div className={props.menu === false ? 'header' : 'h-active'}>
      {/* LOGO */}
      <div className={props.menu === true ? "logo-active" : "logo"}>
        <h2>
          <span className="my-span">My</span>News
        </h2>
      </div>

      {/* MENU */}
      <div className={props.menu === true ? "hide" : "menu"}>
        <HiMenu className="menu-icon" onClick={openMobileMenu}>
          <Link to="/" />
        </HiMenu>
      </div>

      {/* CLOSE MENU */}
      <div className={props.menu === false ? "hide" : "close"}>
        <AiOutlineClose className="close-icon" onClick={openMobileMenu} />
      </div>

      {/* SEARCH BAR */}
      <div className="search">
        {/* SEARCH BAR ICON */}
        <div className="icon">
          <AiOutlineSearch className="src-icon" onClick={addValue} />
        </div>

        {/* INPUT FIELD */}
        <input
          className="input-form"
          type="text"
          placeholder="Search news"
          value={searchTerm}
          // onChange={(event) => props.setSearchTerm(event.target.value)}
          onChange={(event) =>
            event.target.value !== "" ? (word = event.target.value) : addValue()
          }
        />

        {/* INPUT SEARCH BUTTON */}
        <button className="src-btn" onClick={addValue}>
          <Link className="link" to="/">
            SEARCH
          </Link>
        </button>
      </div>

      {/* HEADER UNDERLINE */}
      <div
        className={props.showAd === false ? "line-without-ad" : "line"}
      ></div>
    </div>
  );
};

export default Header;
