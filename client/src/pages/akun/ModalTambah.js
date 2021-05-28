import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tambahPegawai } from "src/redux/actions/pegawai";
import { createUser } from "src/redux/actions/users";
import { errors } from "src/utils";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const kosong = () => {
    setUsername("");
    setPassword("");
  };

  const handleTambah = () => {
    username === "" && errors("Username masih kosong");
    password === "" && errors("Password masih kosong");
    if (username !== "" && password !== "") {
      dispatch(createUser(username, password));
      setModal(false);
      kosong();
    }
  };

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Tambah User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="username">username</CLabel>
              <CInput
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="password">Password</CLabel>
              <CInput
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleTambah()}>
          Tambah
        </CButton>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalTambah;
