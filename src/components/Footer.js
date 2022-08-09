import classes from "./Footer.module.css";
import mailIcon from "../resources/mail.png";
import phoneIcon from "../resources/phone.png";
import markerIcon from "../resources/marker.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <h4 className={classes.header}>Costumer Service</h4>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <a href="/#" className={classes.link}>
              FAQ
            </a>
          </li>
          <li className={classes.listItem}>
            <a href="/#" className={classes.link}>
              Return Policy
            </a>
          </li>
          <li className={classes.listItem}>
            <a href="/#" className={classes.link}>
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={classes.header}>Where to find us</h4>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <img alt="Marker" src={markerIcon} className={classes.icon}></img>
            Av. Street, 1234, Somewhere, Somecity/State
          </li>
          <li className={classes.listItem}>
            <img alt="Phone" src={phoneIcon} className={classes.icon}></img>
            Phone: 00 000000
          </li>
          <li className={classes.listItem}>
            <img alt="Mail" src={mailIcon} className={classes.icon}></img>
            mockupstore@email.com
          </li>
        </ul>
      </div>
      <div>
        <h4 className={classes.header}>Opening Hours</h4>
        <ul className={classes.list}>
          <li className={classes.listItem}>Mon-Fri - 8AM to 8PM</li>
          <li className={classes.listItem}>Sat - 9AM to 6PM</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
