import { ACCESS_TOKEN_KEY_FOR_COOKIE, REFRESH_TOKEN_KEY_FOR_COOKIE, ROUTES } from "#constants/index";
import { $currentUser } from "#stores/account";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export const useLogOut = () => {
  const history = useHistory();

  return () => {
    Cookies.remove(ACCESS_TOKEN_KEY_FOR_COOKIE);
    Cookies.remove(REFRESH_TOKEN_KEY_FOR_COOKIE);

    history.replace(ROUTES.USER_SIGN_IN);

    $currentUser.reset();
  };
};
