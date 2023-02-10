import styles from "./Sidenav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUserGroup,
  faCircleUser,
  faTrophy,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidenav(props) {
  const router = useRouter();
  const [activePath, setActivePath] = useState('/');
  const sideNavItemProps = [
    // { name: "Dashboards", icon: faChartPie, hrefValue: "dashboards"},
    { name: "Teams", icon: faUserGroup, hrefValue: "teams"},
    { name: "Players", icon: faCircleUser, hrefValue: "players"},
    { name: "Matches", icon: faTrophy, hrefValue: "matches"},
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
      <li key={sideNavItemProp.hrefValue} className={`flex justify-center items-center`}><a id={sideNavItemProp.hrefValue}
        className={`flex flex-col gap-[1.2rem] items-center justify-center transition-all duration-300 hover:text-[#33d69f]`}
        href={sideNavItemProp.hrefValue}
        onClick={(e) => handleClick(e, sideNavItemProp.hrefValue)}
      >
        <FontAwesomeIcon
          className={`w-[3.2rem] h-[3.2rem]`}
          icon={sideNavItemProp.icon}
        />
        <span>{sideNavItemProp.name}</span>
      </a></li>
    );
  });
  return (
    <nav className={`min-h-full bg-sidenav text-white px-4 py-8`}>
      <ul className={`list-none p-0 flex flex-col items-center justify-center gap-[1.6rem]`}>{sideNavListItems}</ul>
    </nav>
  );
}
