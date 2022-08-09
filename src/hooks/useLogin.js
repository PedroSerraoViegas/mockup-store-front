import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/slices/login-slice";

const useLogin = ({ usernameValue }) => {
  const dispatch = useDispatch();

  const logIn = () => dispatch(loginActions.login({ username: usernameValue }));
  const logOut = () => dispatch(loginActions.logout());
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const loggedUser = useSelector((state) => state.login.username);

  return {
    logIn,
    logOut,
    isLoggedIn,
    loggedUser,
  };
};

export default useLogin;
