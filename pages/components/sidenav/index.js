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
import { useEffect, useState } from "react";

export default function Sidenav(props) {
  const router = useRouter();
  const [activePath, setActivePath] = useState('/');
  const sideNavItemProps = [
    { name: "Dashboards", icon: faChartPie, hrefValue: "dashboards"},
    { name: "Teams", icon: faUserGroup, hrefValue: "teams"},
    { name: "Players", icon: faCircleUser, hrefValue: "players"},
    { name: "Record Match", icon: faClipboard, hrefValue: "record-match"},
    { name: "Settings", icon: faGear, hrefValue: "settings"},
  ];

  const handleClick = (e, hrefValue) => {
    e.preventDefault();
    console.log(e);
    console.log(hrefValue);
    router.push("/" + hrefValue, null, { shallow: true });
  };

  useEffect(() => {
    console.log(router.pathname);
    console.log(activePath);
    setActivePath(router.pathname);
  }, [router.pathname, activePath]);

  const sideNavListItems = [];
  sideNavItemProps.forEach((sideNavItemProp) => {
    const classNames = styles.sidenavItem;
    sideNavListItems.push(
      <li className={styles.sideNavListItem}><a id={sideNavItemProp.hrefValue}
        className={styles.sideNavItemLink}
        href={sideNavItemProp.hrefValue}
        onClick={(e) => handleClick(e, sideNavItemProp.hrefValue)}
      >
        <FontAwesomeIcon
          className={styles.sidenavItemIcon}
          icon={sideNavItemProp.icon}
        />
        <span>{sideNavItemProp.name}</span>
      </a></li>
    );
  });
  return (
    <nav className={styles.sidenavContainer}>
      <ul className={styles.sideNavList}>{sideNavListItems}</ul>
    </nav>
  );
}
