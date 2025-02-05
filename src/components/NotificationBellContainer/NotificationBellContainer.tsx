"use client";
import dynamic from "next/dynamic";

const NotificationBell = dynamic(
  () => import("../NotificationBell/NotificationBell"),
  {
    ssr: false,
  }
);

const NotificationBellContainer = () => {
  return <NotificationBell />;
};

export default NotificationBellContainer;
