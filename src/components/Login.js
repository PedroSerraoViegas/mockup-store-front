import classes from "./Login.module.css";
import useValidation from "../hooks/useValidation";
import useLogin from "../hooks/useLogin";
import Modal from "./UI/Modal";

const Login = (props) => {
  const username = useValidation((value) => value.trim() !== "");

  const email = useValidation(
    (value) => value.trim() !== "" && value.includes("@")
  );

  const password = useValidation((value) => value.trim() !== "");

  const { logIn, isLoggedIn } = useLogin({
    usernameValue: username.value,
  });

  const formIsValid = username.isValid && password.isValid && email.isValid;

  const loginHandler = (event) => {
    event.preventDefault();
    logIn();
    username.reset();
    email.reset();
    password.reset();
    props.onLoginClick();
  };

  const usernameClasses = username.hasError ? classes.error : "";
  const passwordClasses = password.hasError ? classes.error : "";
  const emailClasses = email.hasError ? classes.error : "";

  return (
    <Modal onClick={props.onLoginClick}>
      {!isLoggedIn && (
        <form className={classes.login} onSubmit={loginHandler}>
          <div className={classes.container}>
            <label className={usernameClasses} htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={username.inputHandler}
              value={username.value}
              onBlur={username.blurHandler}
              className={classes.input}
            ></input>
            {username.hasError && (
              <p className={classes.errorText}>Username can't be empty!</p>
            )}

            <label className={emailClasses} htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              placeholder="address@email.com"
              id="email"
              onChange={email.inputHandler}
              onBlur={email.blurHandler}
              value={email.value}
              className={classes.input}
            ></input>
            {email.hasError && (
              <p className={classes.errorText}>Please enter a valid email!</p>
            )}

            <label className={passwordClasses} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={password.inputHandler}
              onBlur={password.blurHandler}
              value={password.value}
              className={classes.input}
            ></input>
            {password.hasError && (
              <p className={classes.errorText}>Password can't be empty!</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!formIsValid}
            className={classes.button}
          >
            Login
          </button>
        </form>
      )}
    </Modal>
  );
};

export default Login;
