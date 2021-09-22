import { combineReducers } from "redux";
import App from "./App";
import changeState from "./sidebar";
import Pegawai from "./pegawai";
import Users from "./users";
import Absensi from "./absensi";
import Jabatan from "./jabatan";
import Cuti from "./cuti";
import Pangkat from "./pangkat";

export default combineReducers({
  app: App,
  changeState,
  pegawai: Pegawai,
  users: Users,
  absensi: Absensi,
  jabatan: Jabatan,
  cuti: Cuti,
  pangkat: Pangkat,
});
