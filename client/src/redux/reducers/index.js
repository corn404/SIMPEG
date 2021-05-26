import { combineReducers } from "redux";
import App from "./App";
import changeState from "./sidebar";
import Pegawai from "./pegawai";
import Users from "./users";
import Absensi from "./absensi";

export default combineReducers({
  app: App,
  changeState,
  pegawai: Pegawai,
  users: Users,
  absensi: Absensi,
});
