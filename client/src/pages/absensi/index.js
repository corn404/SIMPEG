import React, { useEffect, useRef, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CDataTable,
  CBadge,
  CFormGroup,
  CLabel,
  CInput,
} from "@coreui/react";
import { IoEye, IoFolderOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { getAbsensi, rekapAllAbsensi } from "src/redux/actions/absensi";
import ModalInfo from "./ModalInfo";
import { cibElasticStack, cibLetsEncrypt } from "@coreui/icons";
import { Cetak1 } from "./Cetak1";
import { Cetak2 } from "./Cetak2";
import ModalPriode from "./ModalPriode";

const Absensi = () => {
  const dispatch = useDispatch();
  const dataAbsen = useSelector((x) => x.absensi.data);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState(null);
  const [bulan, setBulan] = useState("");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [selectPegawai, setSelectPegawai] = useState(null);
  const [restData, setRestData] = useState(null);

  const cetak1Ref = useRef();
  const cetak2Ref = useRef();

  const columns = [
    { key: "no", label: "NO", _style: { width: "50px", textAlign: "center" } },
    {
      key: "nidn",
      label: "NIDN/NIY",
      _style: { width: "70px" },
    },
    {
      key: "nama",
      label: "NAMA PEGAWAI",
      _style: { width: "200px" },
    },

    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "30px", textAlign: "center" },
    },
  ];

  const handleOpenModal = async (item) => {
    await setItem(item);
    await setModal(!modal);
  };

  const handlePrint = useReactToPrint({
    content: () => cetak2Ref.current,
  });

  // const handleCetak = async (item) => {
  //   await handlePrint();
  // };

  // const handleOpenModal = async (i) => {
  //   await setItem(item);
  //   await setModal(!modal);
  // };

  const handleLihat = () => {
    dispatch(
      rekapAllAbsensi({ start, end }, async (err, rest) => {
        if (!err) {
          await setRestData(rest);
          await handlePrint();
        }
      })
    );
  };

  useEffect(() => {
    setStart(moment(new Date()).format("yyyy-MM-DD"));
    setEnd(moment(new Date()).format("yyyy-MM-DD"));
    dispatch(getAbsensi());
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Data Absensi
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="2">
              Periode
              <CInput
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </CCol>
            <CCol sm="2">
              S/D
              <CInput
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </CCol>
            <CCol sm="2" style={{ display: "flex", alignItems: "center" }}>
              <CButton
                size="sm"
                color="success"
                onClick={() => handleLihat()}
                style={{
                  height: 35,
                  marginBottom: -15,
                }}
              >
                Lihat
              </CButton>
            </CCol>
          </CRow>
          <CDataTable
            items={dataAbsen}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            pagination
            scopedSlots={{
              no: (item, i) => <td style={{ textAlign: "center" }}>{i + 1}</td>,

              aksi: (item) => (
                <>
                  <td style={{ textAlign: "center" }}>
                    <CButton
                      size="sm"
                      color="success"
                      onClick={() => handleOpenModal(item)}
                    >
                      <IoFolderOutline />
                    </CButton>
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      {/* {item && (
        <ModalInfo
          modal={modal}
          setModal={setModal}
          item={item}
          bulan={bulan}
        />
      )} */}

      <ModalPriode modal={modal} setModal={setModal} data={item} />

      <div style={{ display: "none" }}>
        {/* <Cetak1 ref={cetak1Ref} data={selectPegawai && selectPegawai} /> */}
        <Cetak2
          ref={cetak2Ref}
          data={restData && restData}
          start={start}
          end={end}
        />
      </div>
    </>
  );
};

export default Absensi;
