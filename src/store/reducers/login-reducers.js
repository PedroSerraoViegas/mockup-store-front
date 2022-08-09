export function login(state, loginInfo) {
  state.isLoggedIn = true;
  state.username = loginInfo.payload.username;
}

export function logout(state) {
  state.isLoggedIn = false;
  state.username = "";
}
