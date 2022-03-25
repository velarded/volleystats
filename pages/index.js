import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "./components/footer";
import Header from "./components/header";
import MainContainer from "./components/mainContainer";
import Sidenav from "./components/sidenav";
import { useSelector } from "react-redux";
import HeroContainer from "./components/heroContainer";

export default function Home() {
  const currentUserName = useSelector((state) => state.currentUser.name);

  return (
    <MainContainer />
    // <div className={styles.container}>
    //   <Header />
    //   <main className={styles.main}>
    //     {currentUserName && <Sidenav />}
    //     {/* {currentUserName && <MainContainer />} */}
    //     {!currentUserName && <HeroContainer />}
    //   </main>
    //   <Footer />
    // </div>
  );
}
