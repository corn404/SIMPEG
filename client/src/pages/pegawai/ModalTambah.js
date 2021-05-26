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
import { errors } from "src/utils";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [nohp, setNohp] = useState("");

  const kosong = () => {
    setNip("");
    setNama("");
    setKelamin("");
    setPendidikan("");
    setNohp("");
  };

  const handleTambah = () => {
    nip === "" && errors("NIP masih kosong");
    nama === "" && errors("Nama masih kosong");
    kelamin === "" && errors("Kelamin belum dipilih");
    pendidikan === "" && errors("pendidikan belum dipilih");
    nohp === "" && errors("Nomor hp masih kosong");
    if (
      nama !== "" &&
      nama !== "" &&
      kelamin !== "" &&
      pendidikan !== "" &&
      nohp !== ""
    ) {
      const data = {
        nip,
        nama,
        kelamin,
        pendidikan,
        no_hp: nohp,
      };
      dispatch(tambahPegawai(data));
      setModal(false);
      kosong();
    }
  };

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Tambah Pegawai</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="nip">NIP</CLabel>
              <CInput
                id="nip"
                placeholder="Masukan Masukan NIP"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="nama">Nama Lengkap</CLabel>
              <CInput
                id="nama"
                placeholder="Masukan Nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel>Jenis Kelamin</CLabel>
            </CFormGroup>
            <CFormGroup className="form-check form-check-inline">
              <CInputRadio
                id="kelamin"
                name="kelamin"
                className="form-check-input"
                value="L"
                onChange={(e) => setKelamin(e.target.value)}
              />
              <CLabel htmlFor="kelamin">Laki-Laki</CLabel>
            </CFormGroup>
            <CFormGroup className="form-check form-check-inline">
              <CInputRadio
                id="kelamin"
                name="kelamin"
                className="form-check-input"
                value="P"
                onChange={(e) => setKelamin(e.target.value)}
              />
              <CLabel htmlFor="kelamin">Perempuan</CLabel>
            </CFormGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel>Pendidikan</CLabel>
              <CSelect onChange={(e) => setPendidikan(e.target.value)}>
                <option value="">-- pilih --</option>
                <option value="SMA">SMA</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="no_hp">No HP</CLabel>
              <CInput
                id="no_hp"
                placeholder="08xxxx"
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
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
