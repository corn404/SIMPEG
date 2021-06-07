import React from "react";
import {
  IoAccessibilityOutline,
  IoLayers,
  IoNewspaperOutline,
  IoPeopleOutline,
  IoPieChartOutline,
} from "react-icons/io5";

const _nav = [
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Dashboard",
  //   to: "/dashboard",
  //   icon: <IoPieChartOutline className="c-sidebar-nav-icon" />,
  //   // badge: {
  //   //   color: "info",
  //   //   text: "NEW",
  //   // },
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["MASTER"],
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Rekap Absensi",
    to: "/admin/rekap-absensi",
    icon: <IoNewspaperOutline className="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "danger",
    //   text: "0",
    // },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Pegawai",
    to: "/admin/pegawai",
    icon: <IoAccessibilityOutline className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Jabatan",
    to: "/admin/jabatan",
    icon: <IoLayers className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["SETTINGS"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Akun",
    to: "/setting/akun",
    icon: <IoPeopleOutline className="c-sidebar-nav-icon" />,
  },
];

export default _nav;
