import styles from "./LandingPage.module.css";
import { useSelector } from "react-redux";
export default function LandingPage(props) {
  const currentUserName = useSelector((state) => state.currentUser.name);
  return (<div className={styles.landingContainer}>
    <h1>Welcome, {currentUserName}</h1>
  </div>);
}
