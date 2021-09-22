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
import { addMapPangkat, addPangkat } from "src/redux/actions/pangkat";
import { errors } from "src/utils";

const ModalTambah2 = ({ modal, setModal, idPangkat }) => {
  const dispatch = useDispatch();
  const [keterangan, setKeterangan] = useState("");
  const kosong = () => {
    setKeterangan("");
    setModal(false);
  };

  const handleTambah = () => {
    keterangan === "" && errors("Pangkat masih kosong");

    if (keterangan !== "") {
      const data = {
        id_pangkat: idPangkat,
        keterangan: keterangan,
      };
      kosong();
      dispatch(addMapPangkat(data));
    }
  };

  return (
    <CModal show={modal} onClose={setModal} closeOnBackdrop={false}>
      <CModalHeader closeButton>
        <CModalTitle>Form Tambah Mapping Upload {idPangkat}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="keterangan">Keterangan</CLabel>
              <CInput
                type="text"
                name="keterangan"
                placeholder="Keterangan"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
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

export default ModalTambah2;
