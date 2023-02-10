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

  const signInButton = <a className={`bg-accent px-[1.6rem] py-[0.8rem] rounded-[0.5rem] shadow-signIn transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-accent`} onClick={signInHandler}>Sign In</a>;

  return (
    <header>
      <nav className={`h-[8rem] grid grid-cols-[15rem_90fr] items-center bg-sidenav text-white`}>
        <p className={`bg-accent h-full m-0 p-0 rounded-tr-[5rem] rounded-bl-[5rem] flex justify-center items-center`}>
          <Link className={`flex uppercase tracking-[0.5rem] text-[3.2rem]`} href="/">
            VS
          </Link>
        </p>
        <ul className={`flex gap-[5rem] items-center justify-self-end pr-[5rem]`}>
          {currentUserName !== "" && (
            <li className={`list-none tracking-[0.1rem] hover:text-[grey] transition-all duration-300 flex gap-[2.5rem] items-center justify-center`}>
              <span>{currentUserName}</span>
              <img className={`w-[4.8rem] h-[4.8rem] rounded-full`} src={currentUserPhotoUrl} />
              <span className={`h-[4.8rem] border-l-[2px] border-white`}></span>
            </li>
          )}
          <li className={`list-none tracking-[0.1rem]`}>
            {currentUserName === "" && signInButton}
            {currentUserName !== "" && <FontAwesomeIcon
          className={`w-[2.4rem] h-[2.4rem] transition-all duration-300 hover:cursor-pointer hover:text-accent`}
          icon={faRightFromBracket}
          onClick={logoutHandler}
        />}
          </li>
        </ul>
      </nav>
    </header>
  );
}
