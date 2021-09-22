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
  IoEye,
  IoReload,
  IoTrashOutline,
  IoFolderOutline,
} from "react-icons/io5";

import ModalTambah from "./ModalTambah";
import Swal from "sweetalert2";
import { getPegawai } from "src/redux/actions/pegawai";
import moment from "moment";
import "quill/dist/quill.snow.css";
import {
  getMapPangkat,
  getPangkat,
  hapusMapPangkat,
  hapusPangkat,
} from "src/redux/actions/pangkat";
import ModalTambah2 from "./ModalTambah2";

const MappingPangkat = () => {
  const dispatch = useDispatch();
  const dataPangkat = useSelector((x) => x.pangkat.data);
  const dataMapPangkat = useSelector((x) => x.pangkat.map);
  const [maptitle, setMapTitle] = useState("");
  const [idMap, setIdMap] = useState("");

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const columnUploads = [
    { key: "no", label: "NO", _style: { width: "100px" } },
    { key: "keterangan", label: "KETERANGAN" },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "200px", textAlign: "center" },
    },
  ];

  const columnPangkat = [
    { key: "no", label: "NO", _style: { width: "70px" } },
    { key: "pangkat", label: "PANGKAT" },
    { key: "golongan", label: "GOLONGAN", _style: { textAlign: "center" } },
    { key: "ruang", label: "RUANG", _style: { textAlign: "center" } },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "200px", textAlign: "center" },
    },
  ];

  const handleHapus = (item) => {
    Swal.fire({
      title: "yakin ingin menghapus data pangkat ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(hapusPangkat(item.id));
        // console.log(item.);
      }
    });
  };

  const handleHapusMap = (item) => {
    Swal.fire({
      title: "yakin ingin menghapus mapping ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(hapusMapPangkat(item.id, item.id_pangkat));
        // console.log(item.);
      }
    });
  };
  const handleSelect = (item) => {
    setMapTitle(`${item.pangkat} - ${item.golongan}/${item.ruang}`);
    setIdMap(item.id);
    dispatch(getMapPangkat(item.id));
  };

  useEffect(() => {
    dispatch(getPegawai());
    dispatch(getPangkat());
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Pangkat
                  </h4>
                </CCol>
                <CCol sm="7" className="d-none d-md-block">
                  <CButton
                    color="primary"
                    className="float-right"
                    onClick={() => setModal(!modal)}
                  >
                    Tambah Pangkat
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={dataPangkat}
                fields={columnPangkat}
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
                  golongan: (item) => (
                    <td style={{ textAlign: "center" }}>{item.golongan}</td>
                  ),
                  ruang: (item) => (
                    <td style={{ textAlign: "center" }}>{item.ruang}</td>
                  ),
                  aksi: (item) => (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <CButton
                          style={{ marginRight: 10 }}
                          size="sm"
                          color="danger"
                          onClick={() => handleHapus(item)}
                        >
                          <IoTrashOutline />
                        </CButton>
                        <CButton
                          size="sm"
                          color="success"
                          onClick={() => handleSelect(item)}
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
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="8">
                  <h4 id="traffic" className="card-title mb-0">
                    Mapping : {maptitle}
                  </h4>
                </CCol>
                <CCol sm="4" className="d-none d-md-block">
                  <CButton
                    color="primary"
                    className="float-right"
                    disabled={idMap !== "" ? false : true}
                    onClick={() => setModal2(!modal2)}
                  >
                    Tambah Mapping
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={dataMapPangkat}
                fields={columnUploads}
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
                          onClick={() => handleHapusMap(item)}
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
        </CCol>
      </CRow>

      <ModalTambah modal={modal} setModal={setModal} />
      {idMap !== "" && (
        <ModalTambah2 modal={modal2} setModal={setModal2} idPangkat={idMap} />
      )}
    </>
  );
};

export default MappingPangkat;
