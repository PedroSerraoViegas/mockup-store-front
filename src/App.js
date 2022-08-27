import { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Display from "./components/Display";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Greeting from "./components/Greeting";
import classes from "./App.module.css";
import ProductManagement from "./components/Admin/ProductManagement";
import ProductDetail from "./components/Admin/ProductDetail";

function App() {
  const [cartVisible, setCartIsVisible] = useState(false);
  const [loginIsVisible, setLoginIsVisible] = useState(false);

  const loginVisibilityHandler = () => {
    setLoginIsVisible(!loginIsVisible);
  };

  const cartVisibilityHandler = () => {
    setCartIsVisible(!cartVisible);
  };

  return (
    <Fragment>
      <NavBar
        onCartClick={cartVisibilityHandler}
        onLoginClick={loginVisibilityHandler}
      />
      <main className={classes.main}>
        {loginIsVisible && <Login onLoginClick={loginVisibilityHandler} />}
        <Greeting />
        <Route path="/admin">
          <ProductManagement />
        </Route>
        <Route path="/" exact>
          <Display />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        {cartVisible && <Cart onCartClick={cartVisibilityHandler} />}
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
