import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CDataTable,
} from "@coreui/react";
import ModalTambah from "./ModalTambah";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePegawai,
  getPegawai,
  resetPassword,
} from "src/redux/actions/pegawai";
import { IoEye, IoReload, IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";

const Pegawai = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [item, setItem] = useState(null);
  const dataPegawai = useSelector((x) => x.pegawai.data);

  const columns = [
    { key: "nip", label: "NIP" },
    { key: "nama", label: "NAMA PEGAWAI" },
    { key: "kelamin", label: "KELAMIN" },
    { key: "pendidikan", label: "PENDIDIKAN" },
    { key: "no_hp", label: "NO HP" },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "150px", textAlign: "center" },
    },
  ];

  const handleHapus = (item) => {
    Swal.fire({
      title: "yakin ingin menghapus pegawai ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePegawai(item.id));
      }
    });
  };

  const handleReset = (item) => {
    Swal.fire({
      title: "yakin ingin reset password pegawai ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetPassword(item.id, item.nip));
      }
    });
  };

  const handleUpdate = async (item) => {
    await setItem(item);
    await setModalUpdate(true);
  };

  useEffect(() => {
    dispatch(getPegawai());
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Data Pegawai
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton
                color="primary"
                className="float-right"
                onClick={() => setModal(!modal)}
              >
                Tambah
              </CButton>
            </CCol>
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
              no_hp: (item) => (
                <>{item.no_hp ? <td>{item.no_hp}</td> : <td> </td>}</>
              ),
              aksi: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    size="sm"
                    color="warning"
                    style={{ marginRight: 10 }}
                    onClick={() => handleReset(item)}
                  >
                    <IoReload />
                  </CButton>
                  <CButton
                    size="sm"
                    color="info"
                    style={{ marginRight: 10 }}
                    onClick={() => handleUpdate(item)}
                  >
                    <IoEye />
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => handleHapus(item)}
                  >
                    <IoTrashOutline />
                  </CButton>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      <ModalTambah modal={modal} setModal={setModal} />
      {item && (
        <ModalUpdate
          modal={modalUpdate}
          setModal={setModalUpdate}
          item={item}
        />
      )}
    </>
  );
};

export default Pegawai;
