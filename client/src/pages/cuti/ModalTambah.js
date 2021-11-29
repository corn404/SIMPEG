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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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
    start === "" && errors("Tentukan tanggal mulai cuti");
    end === "" && errors("Tentukan tanggal akhir cuti");

    if (nama !== null && start !== "" && end !== "") {
      dispatch(AddCuti(nama, start, end));
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
              <CLabel htmlFor="jabatan">Mulai Cuti</CLabel>
              <CInput
                id="nama"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="jabatan">Sampai</CLabel>
              <CInput
                id="nama"
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
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
