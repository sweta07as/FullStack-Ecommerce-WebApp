import React from "react";
//images imports missing

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our app</h4>
        <p>Download App for Android and IOS mobile phone</p>
        {/* images links missing */}
      </div>

      <div className="midFooter">
        <h1>FABTOKRI</h1>
        <p>High quality is our first priority</p>
        <p>Copyright 2021 &copy; FabTokri</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/fabtokri/">Instagram</a>
        <a href="https://www.facebook.com/fabtokri">Facebook</a>
        <a href="https://www.facebook.com/fabtokri">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
