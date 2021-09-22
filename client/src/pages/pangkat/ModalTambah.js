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
import Select from "react-select";
import { AddCuti } from "src/redux/actions/cuti";
import { errors } from "src/utils";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const kosong = () => {
    setNama(null);
    setTanggal("");
  };
  const dataPegawai = useSelector((x) => x.pegawai.data);

  const option = dataPegawai.map((x) => {
    return {
      value: x.id,
      label: x.nama,
    };
  });

  const handleTambah = () => {
    nama === null && errors("Nama Pegawai masih kosong");
    tanggal === "" && errors("Tentukan tanggal");

    if (nama !== null && tanggal !== "") {
      dispatch(AddCuti(nama, tanggal));
      setModal(false);
      kosong();
    }
  };

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Form Cuti Pegawai</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="jabatan">Nama Pegawai</CLabel>
              <Select
                defaultInputValue=""
                isSearchable={true}
                isClearable={true}
                options={option}
                placeholder="Nama Pegawai"
                noOptionsMessage={(e) => "Tidak ada data!"}
                value={nama}
                onChange={(e) => setNama(e)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="jabatan">Tanggal Cuti</CLabel>
              <CInput
                id="nama"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleTambah()}>
          Buat Cuti
        </CButton>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalTambah;
