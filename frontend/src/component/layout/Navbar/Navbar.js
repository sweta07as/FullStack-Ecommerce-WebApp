import React, { Fragment, useState, useEffect } from "react";
import Logo from "../../../images/logopng.png";
import Profile from "@material-ui/icons/AccountCircleOutlined";
import Search from "@material-ui/icons/SearchOutlined";
import Cart from "@material-ui/icons/LocalMallOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

// import { GiHamburgerMenu } from "react-icons/gi";
import HamBurgerMenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { user, isAuthenticated, error } = useSelector((state) => state.user);

  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (user) {
      setRole(user.role);
      console.log(user.role);
    }
    // history.push("/admin/dashboard");
  }, [user]);

  const handleDashboardClick = () => {
    if (isAuthenticated && role === "admin") {
      history.push("/admin/dashboard");
    } else {
      // Redirect the user to a different page or show an error message
      alert.error("You are not authorized to access this page!");
    }
  };

  return (
    <Fragment>
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
                <Search className="search" />
              </a>
            </li>
            <li>
              <a href="/account">
                <Profile className="profile" />
              </a>
            </li>
            <li>
              <a href="/cart">
                <Cart className="cart" />
              </a>
            </li>

            <li>
              <Link
                to="/admin/dashboard"
                // onClick={handleDashboardClick}
              >
                <DashboardIcon
                  className={role === "admin" ? "cart" : "dashboardIcon"}
                />
              </Link>
            </li>
          </ul>
        </div>
        {/* hamburget menu start  */}
        <div className="hamburger-menu">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            {showMediaIcons ? (
              <CloseIcon className="close" />
            ) : (
              <HamBurgerMenuIcon className="ham" />
            )}
          </a>
        </div>

        {/* <div className="hamburger-menu">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <HamBurgerMenuIcon className="ham" />
            <CloseIcon className="close" />
          </a>
        </div> */}
      </nav>
    </Fragment>
  );
};

export default Navbar;
