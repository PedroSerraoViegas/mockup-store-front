import cartIcon from "../resources/cartIcon.png";
import classes from "./NavBar.module.css";
import useLogin from "../hooks/useLogin";
import { useSelector } from "react-redux";
import storeIcon from "../resources/storeIcon.png";
import storeImage from "../resources/store-background.jpg";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { logOut, isLoggedIn } = useLogin({});
  const cartProductsAmount = useSelector((state) => state.cart.products);

  const numbeOfCartItems = cartProductsAmount.reduce((curNumber, product) => {
    return curNumber + product.payload.amount;
  }, 0);

  const logoutHandler = () => {
    logOut();
  };

  return (
    <Fragment>
      <div className={classes.imgDiv}>
        <img src={storeImage} alt="Store" className={classes.img}></img>
      </div>
      <nav className={classes.navbar}>
        <div className={classes.store}>
          <img
            className={classes.storeIcon}
            src={storeIcon}
            alt="A store icon."
          ></img>
          <h3>REACT MOCKUP STORE</h3>
        </div>
        <Link className={classes.link} to="/">
          Home
        </Link>
        <Link className={classes.link} to="/admin">
          Admin
        </Link>
        <div className={classes.actions}>
          {isLoggedIn && (
            <button onClick={logoutHandler} className={classes.logout}>
              Logout
            </button>
          )}
          {!isLoggedIn && (
            <button onClick={props.onLoginClick} className={classes.logout}>
              Login
            </button>
          )}
          <button onClick={props.onCartClick} className={classes.button}>
            <img
              className={classes.cartIcon}
              src={cartIcon}
              alt="A shopping cart."
            ></img>
            <span>{numbeOfCartItems}</span>
          </button>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
