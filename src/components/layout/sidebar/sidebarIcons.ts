import homeIcon from "/sidebar/home.svg";
import mapIcon from "/sidebar/map.svg";
import userIcon from "/sidebar/user.svg";
import clipboardIcon from "/sidebar/clipboard.svg";
import truckIcon from "/sidebar/truck.svg";
import solarIcon from "/sidebar/solar.svg";

export const sidebarIcons = [
  { id: "dashboard", Icon: homeIcon, active: true },
  { id: "orders", Icon: clipboardIcon },
  { id: "map", Icon: mapIcon },
  { id: "analytics", Icon: solarIcon },
  { id: "settings", Icon: userIcon },
  { id: "profile", Icon: truckIcon },
];
