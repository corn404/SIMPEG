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
import { tambahJabatan } from "src/redux/actions/jabatan";
import { errors } from "src/utils";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const kosong = () => {
    setNama("");
  };

  const handleTambah = () => {
    nama === "" && errors("Username masih kosong");
    if (nama !== "") {
      dispatch(tambahJabatan(nama));
      setModal(false);
      kosong();
    }
  };

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Tamba Jabatan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="jabatan">Jabatan</CLabel>
              <CInput
                id="jabatan"
                placeholder="jabatan"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
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
