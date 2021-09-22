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
import { useDispatch, useSelector } from "react-redux";
import { addPangkat } from "src/redux/actions/pangkat";
import { errors } from "src/utils";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [pangkat, setPangkat] = useState("");
  const [golongan, setGolongan] = useState("");
  const [ruang, setRuang] = useState("");
  const kosong = () => {
    setPangkat("");
    setGolongan("");
    setRuang("");
    setModal(false);
  };

  const handleTambah = () => {
    pangkat === "" && errors("Pangkat masih kosong");
    golongan === "" && errors("Golongan masih kosong");
    ruang === "" && errors("Ruang masih kosong");

    if (pangkat !== "" && golongan !== "" && ruang !== "") {
      const data = {
        pangkat,
        golongan,
        ruang,
      };
      dispatch(addPangkat(data));
      kosong();
    }
  };

  return (
    <CModal show={modal} onClose={setModal} closeOnBackdrop={false}>
      <CModalHeader closeButton>
        <CModalTitle>Form Tambah Pangkat</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="pangkat">Pangkat</CLabel>
              <CInput
                type="text"
                name="pangkat"
                placeholder="Pangkat"
                onChange={(e) => setPangkat(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="golongan">Golongan</CLabel>
              <CInput
                type="text"
                name="golongan"
                placeholder="Golongan"
                onChange={(e) => setGolongan(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="ruang">Ruang</CLabel>
              <CInput
                type="text"
                name="ruang"
                placeholder="Ruang"
                onChange={(e) => setRuang(e.target.value)}
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
