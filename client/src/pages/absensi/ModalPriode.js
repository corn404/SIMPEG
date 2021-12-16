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
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { rekapAbsensiByPegawai } from "src/redux/actions/absensi";
import { Cetak1 } from "./Cetak1";
import { BASE_URL } from "src/redux/actions";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const ModalPriode = ({ modal, setModal, data }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [item, setItem] = useState(item);
  const cetak1Ref = useRef();

  const handleTambah = async () => {
    const get = await axios.get(
      `${BASE_URL}/absensi/pegawai?start=${start}&end=${end}&pegawai=${data.id}`
    );
    await setItem(get.data.data);

    await handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => cetak1Ref.current,
    onAfterPrint: () => setModal(!modal),
  });

  useEffect(() => {
    setStart(moment(new Date()).format("yyyy-MM-DD"));
    setEnd(moment(new Date()).format("yyyy-MM-DD"));
  }, [modal]);

  return (
    <>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Rekapitulasi Absensi Pegawai</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="jabatan">Periode</CLabel>
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
                <CLabel htmlFor="jabatan">S/D</CLabel>
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
            Lihat
          </CButton>
        </CModalFooter>
      </CModal>
      <div style={{ display: "none" }}>
        {item && (
          <Cetak1
            ref={cetak1Ref}
            data={data}
            item={item}
            start={start}
            end={end}
          />
        )}
      </div>
    </>
  );
};

export default ModalPriode;
