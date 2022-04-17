import styles from "./Header.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../../src/store/auth-actions";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import firebaseConfig from "../../../src/config/firebase.config";
import Link from "next/link";

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

  const signInButton = <a className={styles.signInButton} onClick={signInHandler}>Sign In</a>;

  return (
    <header>
      <nav className={styles.navContainer}>
        <p className={styles.logoContainer}>
          <Link className={styles.logo} href="/#">
            VS
          </Link>
        </p>
        <ul className={styles.navList}>
          {currentUserName !== "" && (
            <li className={`${styles.navListItem} ${styles.currentUserInfo}`}>
              <span>{currentUserName}</span>
              <img className={styles.displayPic} src={currentUserPhotoUrl} />
              <span className={styles.headerDivider}></span>
            </li>
          )}
          <li className={styles.navListItem}>
            {currentUserName === "" && signInButton}
            {currentUserName !== "" && <FontAwesomeIcon
          className={styles.logoutIcon}
          icon={faRightFromBracket}
          onClick={logoutHandler}
        />}
          </li>
        </ul>
      </nav>
    </header>
  );
}
