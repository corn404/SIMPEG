import React from "react";

// const Cards = React.lazy(() => import("./views/base/cards/Cards"));
// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// const Colors = React.lazy(() => import("./views/theme/colors/Colors"));

const Absensi = React.lazy(() => import("./pages/absensi/index"));
const Jabatan = React.lazy(() => import("./pages/jabatan/index"));
const Pegawai = React.lazy(() => import("./pages/pegawai/index"));
const Akun = React.lazy(() => import("./pages/akun/index"));
const Cuti = React.lazy(() => import("./pages/cuti/index"));
const Pangkat = React.lazy(() => import("./pages/pangkat/index"));
const MappingPangkat = React.lazy(() =>
  import("./pages/mapping_pangkat/index")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin", name: "Admin", component: Absensi, exact: true },
  { path: "/admin/rekap-absensi", name: "Rekap Absensi", component: Absensi },
  { path: "/admin/pegawai", name: "Pegawai", component: Pegawai },
  { path: "/admin/cuti", name: "Cuti", component: Cuti },
  { path: "/admin/pangkat", name: "Cuti", component: Pangkat },
  { path: "/admin/jabatan", name: "Jabatan", component: Jabatan },
  { path: "/setting", name: "Setting", component: Akun, exact: true },
  {
    path: "/setting/pangkat",
    name: "Mapping Pangkat",
    component: MappingPangkat,
  },
  { path: "/setting/akun", name: "Akun", component: Akun },
];

export default routes;
