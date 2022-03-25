import styles from "./Sidenav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUserGroup,
  faCircleUser,
  faClipboard,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Sidenav(props) {
  const router = useRouter();
  const sideNavItemProps = [
    { name: "Dashboards", icon: faChartPie, hrefValue: "dashboards" },
    { name: "Teams", icon: faUserGroup, hrefValue: "teams" },
    { name: "Players", icon: faCircleUser, hrefValue: "players" },
    { name: "Record Match", icon: faClipboard, hrefValue: "record-match" },
    { name: "Settings", icon: faGear, hrefValue: "settings" },
  ];

  const handleClick = (e, hrefValue) => {
    e.preventDefault();
    console.log(e);
    console.log(hrefValue);
    router.push("/" + hrefValue, null, { shallow: true });
  };

  const sideNavListItems = [];
  sideNavItemProps.forEach((sideNavItemProp) => {
    sideNavListItems.push(
      <a
        className={styles.sidenavItem}
        href={sideNavItemProp.hrefValue}
        onClick={(e) => handleClick(e, sideNavItemProp.hrefValue)}
      >
        <FontAwesomeIcon
          className={styles.sidenavItemIcon}
          icon={sideNavItemProp.icon}
        />
        <span>{sideNavItemProp.name}</span>
      </a>
    );
  });
  return (
    <nav className={styles.sidenavContainer}>
      <ul className={styles.sideNavList}>{sideNavListItems}</ul>
    </nav>
  );
}
