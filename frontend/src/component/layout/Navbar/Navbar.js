import React, { useState } from "react";
import Logo from "../../../images/logopng.png";
import Profile from "@material-ui/icons/AccountCircleOutlined";
import Search from "@material-ui/icons/SearchOutlined";
import Cart from "@material-ui/icons/LocalMallOutlined";
import "./Navbar.css";

import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <NavLink to="/story">STORY</NavLink>
            </li>
            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/products">PRODUCTS</NavLink>
            </li>
            <li>
              <NavLink to="/craft"> CRAFT</NavLink>
            </li>
          </ul>
        </div>

        <div className="logo">
          <a href="/">
            <img src={Logo} alt="FabTokri" />
          </a>
        </div>

        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="/search">
                <Search style={{ fontSize: 36}} className="search" />
              </a>
            </li>
            <li>
              <a href="/account">
                <Profile style={{ fontSize: 36}} className="profile" />
              </a>
            </li>
            <li>
              <a href="/cart">
                <Cart style={{ fontSize: 36}} className="cart" />
              </a>
            </li>
          </ul>

          {/* hamburget menu start  */}
          {/* <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
