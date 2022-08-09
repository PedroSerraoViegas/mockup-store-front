import Navbar from "./NavBar";
import storeImage from "../resources/store-background.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <div>
        <img src={storeImage} alt="Store" className={classes.img}></img>
      </div>
      <Navbar onCartClick={props.onCartClick} />
    </header>
  );
};

export default Header;
