import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="topFooter">
        <div className="leftFooter">
          <h4>LOCATE US</h4>
          <p>B-224/A, Uttam Nagar, Dwarka More, Delhi, India, 110059</p>
          <p>+91 085276 43249</p>
          <p>fabtokri@gmail.com</p>
        </div>

        <div className="midFooter">
          <h4>PRODUCT</h4>
          {/* <a href="#">About</a> */}
          {/* <a href="#">Craft</a> */}
          {/* <a href="#">Contact Us</a> */}
        </div>

        <div className="rightFooter">
          <h4>SUPPORT</h4>
          {/* <a href="#">Privacy Policy</a> */}
          {/* <a href="#">Terms Of Service</a> */}
          {/* <a href="#">Help Centre</a> */}
        </div>
      </div>

      <hr style={{ width: "80%" }} />

      <div className="bottomFooter">
        <div className="links">
          <a href="https://www.instagram.com/fabtokri/">
            <InstagramIcon style={{ fontSize: 36 }} className="ig"/>
          </a>
          <a href="https://www.facebook.com/fabtokri">
            <FacebookIcon style={{ fontSize: 36 }} className="fb"/>
          </a>
          <a href="https://www.twitter.com/fabtokri">
            <TwitterIcon style={{ fontSize: 36 }} className="twitter"/>
          </a>
        </div>
        <p>&copy; FabTokri 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
