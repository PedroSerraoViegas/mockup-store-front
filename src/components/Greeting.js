import Card from "./UI/Card";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./Greeting.module.css";

const Greeting = () => {
  const login = useSelector((state) => state.login);

  return (
    <Fragment>
      <Card>
        {login.isLoggedIn && (
          <h3 className={classes.greeting}>
            Welcome, <span className={classes.username}>{login.username}</span>!
          </h3>
        )}
        {!login.isLoggedIn && (
          <h3 className={classes.greeting}>You are not logged in.</h3>
        )}
      </Card>
    </Fragment>
  );
};

export default Greeting;
