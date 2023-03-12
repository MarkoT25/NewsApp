import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Adbar.scss";

const Adbar = ({showAd, setShowAd}) => {
  

  const hide = () => {
    setShowAd(false);
  }
  return (
    //ADBAR
    <div className={showAd === true ? 'adbar' : 'hide'}>
      {/* LEFT SIDE */}
      <div className="left">
        <h3>Make MyNews your homepage</h3>
      </div>

      {/* MIDDLE SIDE */}
      <div className="mid">
        <h5>Every day discover what’s trending on the internet!</h5>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        {/* BUTTONS */}
        <button className="get-btn">
          <Link className="link" to="/" >
            GET
          </Link>
        </button>

        <Link className="link nt-link" to="/" onClick ={hide}>
          No, thanks
        </Link>
      </div>
    </div>
  );
};

export default Adbar;
