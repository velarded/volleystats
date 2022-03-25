import styles from "./Header.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../../src/store/auth-actions";
import { useRouter } from "next/router";

export default function Header(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUserName = useSelector((state) => state.currentUser.name);
  const currentUserPhotoUrl = useSelector(
    (state) => state.currentUser.photoUrl
  );

  useEffect(() => {}, [dispatch]);

  const signInHandler = async () => {
    console.log("clicked sign in button");
    await dispatch(login());
    console.log("after login");
    router.push("/landing");
  };

  const logoutHandler = async () => {
    console.log("clicked sign out button");
    await dispatch(logout());
    router.push("/");
  };

  return (
    <header>
      <nav className={styles.navContainer}>
        <p className={styles.logoContainer}>
          <a className={styles.logo} href="#">
            VS
          </a>
        </p>
        <ul className={styles.navList}>
          {currentUserName !== "" && (
            <li className={`${styles.navListItem} ${styles.currentUserInfo}`}>
              <span>{currentUserName}</span>
              <img className={styles.displayPic} src={currentUserPhotoUrl} />
              <span class={styles.headerDivider}></span>
            </li>
          )}
          <li className={styles.navListItem}>
            <a
              className={styles.signInButton}
              onClick={currentUserName === "" ? signInHandler : logoutHandler}
            >
              {currentUserName === "" ? "Sign in" : "Logout"}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
