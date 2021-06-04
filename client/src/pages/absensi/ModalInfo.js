import {
  CBadge,
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
  CNavItem,
  CRow,
  CSelect,
} from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "src/redux/actions";

import { getJabatan } from "src/redux/actions/jabatan";

const ModalInfo = ({ modal, setModal, item, bulan }) => {
  const dispatch = useDispatch();
  const [hadir, setHadir] = useState(0);
  const [absen, setAbsen] = useState(0);

  useEffect(async () => {
    await dispatch(getJabatan());
    const getData = await axios.get(
      `${BASE_URL}/absensi/rekap?bulan=${bulan}&pegawai=${item.id}`
    );
    if (getData.data.status === "Success") {
      if (getData.data.data.rekap.length > 0) {
        setHadir(getData.data.data.hadir.hadir);
        setAbsen(getData.data.data.absen.absen);
      } else {
        setHadir(0);
        setAbsen(0);
      }
    }
  }, [bulan]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Rekap Absensi</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol>NIDN/NIY : {item.nidn}</CCol>
        </CRow>
        <CRow>
          <CCol>Nama : {item.nama}</CCol>
        </CRow>
        <CRow>
          <CCol>Pendidikan : {item.pendidikan}</CCol>
        </CRow>

        <CRow style={{ padding: 20, textAlign: "center" }}>
          <CCol>
            HADIR : <CBadge color="success">{hadir}</CBadge>
          </CCol>
          <CCol>
            ABSEN : <CBadge color="danger">{absen}</CBadge>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Kembali
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalInfo;
