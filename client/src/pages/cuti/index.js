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
import { IoEye, IoReload, IoTrashOutline } from "react-icons/io5";
import ModalTambah from "./ModalTambah";
import Swal from "sweetalert2";
import { getCuti, DeleteCuti } from "src/redux/actions/cuti";
import { getPegawai } from "src/redux/actions/pegawai";
import moment from "moment";

const Cuti = () => {
  const dispatch = useDispatch();
  const dataCuti = useSelector((x) => x.cuti.data);

  const [modal, setModal] = useState(false);
  const columns = [
    { key: "no", label: "NO", _style: { width: "100px" } },
    { key: "nama", label: "NAMA PEGAWAI" },
    { key: "jabatan", label: "JABATAN" },
    { key: "mulai_cuti", label: "MULAI" },
    { key: "akhir_cuti", label: "BERAKHIR" },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "200px", textAlign: "center" },
    },
  ];

  const handleHapus = (item) => {
    Swal.fire({
      title: "yakin ingin menghapus data cuti ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteCuti(item.id, item.id_pegawai));
        // console.log(item.);
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
                Daftar Cuti Pegawai
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton
                color="primary"
                className="float-right"
                onClick={() => setModal(!modal)}
              >
                Tambah Cuti
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={dataCuti}
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
              aksi: (item) => (
                <>
                  <td style={{ textAlign: "center" }}>
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => handleHapus(item)}
                    >
                      <IoTrashOutline />
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

export default Cuti;
