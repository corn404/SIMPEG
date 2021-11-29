import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CDataTable,
  CBadge,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, resetPassword } from "src/redux/actions/users";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoTrashOutline,
} from "react-icons/io5";
import ModalTambah from "./ModalTambah";
import Swal from "sweetalert2";
import { getCuti, DeleteCuti } from "src/redux/actions/cuti";
import { getPegawai } from "src/redux/actions/pegawai";
import moment from "moment";
import { naikPangkat, turunPangkat } from "src/redux/actions/pangkat";

const Pangkat = () => {
  const dispatch = useDispatch();
  const dataCuti = useSelector((x) => x.cuti.data);
  const dataPegawai = useSelector((x) => x.pegawai.data);

  const [modal, setModal] = useState(false);
  const columns = [
    { key: "no", label: "NO", _style: { width: "100px" } },
    { key: "nidn", label: "NIDN/NIDY" },
    { key: "nama", label: "NAMA PEGAWAI" },
    { key: "pendidikan", label: "PENDIDIKAN" },
    { key: "pangkat", label: "PANGKAT/GOLONGAN" },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "200px", textAlign: "center" },
    },
  ];

  const handleTurun = (item) => {
    Swal.fire({
      title: "Turun pangkat ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(turunPangkat(item.id_pangkat, item.id));
      }
    });
  };

  const handleNaik = (item) => {
    Swal.fire({
      title: "Naik pangkat ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(naikPangkat(item.id_pangkat, item.id));
      }
    });
  };

  useEffect(() => {
    dispatch(getPegawai());
    dispatch(getCuti());
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Data Pangkat Dan Golongan
              </h4>
            </CCol>
            {/* <CCol sm="7" className="d-none d-md-block">
              <CButton
                color="primary"
                className="float-right"
                onClick={() => setModal(!modal)}
              >
                Tambah
              </CButton>
            </CCol> */}
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={dataPegawai}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            pagination
            scopedSlots={{
              no: (item, i) => (
                <>
                  <td>{i + 1}</td>
                </>
              ),
              mulai_cuti: (item) => (
                <td>{moment(item.mulai_cuti).format("DD-MM-YYYY")}</td>
              ),
              akhir_cuti: (item) => (
                <td>{moment(item.akhir_cuti).format("DD-MM-YYYY")}</td>
              ),
              pangkat: (item) => (
                <td>
                  {item.pangkat} - {item.golongan}/{item.ruang}
                </td>
              ),
              aksi: (item) => (
                <>
                  <td style={{ textAlign: "center" }}>
                    <CButton
                      size="sm"
                      color="warning"
                      style={{ marginRight: 5 }}
                      onClick={() => handleTurun(item)}
                    >
                      <IoArrowDownOutline />
                    </CButton>
                    <CButton
                      size="sm"
                      color="success"
                      onClick={() => handleNaik(item)}
                    >
                      <IoArrowUpOutline />
                    </CButton>
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      <ModalTambah modal={modal} setModal={setModal} />
    </>
  );
};

export default Pangkat;
