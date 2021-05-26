import React from "react";

const Cards = React.lazy(() => import("./views/base/cards/Cards"));
// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));

const Absensi = React.lazy(() => import("./pages/absensi/index"));
const Pegawai = React.lazy(() => import("./pages/pegawai/index"));
const Akun = React.lazy(() => import("./pages/akun/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin", name: "Admin", component: Colors, exact: true },
  { path: "/admin/absensi", name: "Absensi", component: Absensi },
  { path: "/admin/pegawai", name: "Pegawai", component: Pegawai },
  { path: "/setting", name: "Setting", component: Cards, exact: true },
  { path: "/setting/akun", name: "Akun", component: Akun },
];

export default routes;
