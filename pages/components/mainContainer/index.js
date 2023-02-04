import styles from "./MainContainer.module.css";
import { useSelector } from "react-redux";
import Header from "../header";
import Footer from "../footer";
import Sidenav from "../sidenav";
import HeroContainer from "../heroContainer";
import FeaturesContainer from "../features";

export default function MainContainer(props) {
  const currentUserName = useSelector((state) => state.currentUser.name);
  const children = props.children;

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {currentUserName && <Sidenav />}
        {currentUserName && children}
        {!currentUserName && <><HeroContainer /><FeaturesContainer /></>}
      </main>
      <Footer />
    </div>
  );
}
