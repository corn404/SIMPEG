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
import { deleteUser, getUser, resetPassword } from "src/redux/actions/users";
import { IoReload, IoTrashOutline } from "react-icons/io5";
import ModalTambah from "./ModalTambah";
import Swal from "sweetalert2";

const Akun = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((x) => x.users.data);
  const currentUser = useSelector((x) => x.users.currentUser);
  const [modal, setModal] = useState(false);
  const columns = [
    { key: "no", label: "NO", _style: { width: "100px" } },
    { key: "username", label: "USERNAME" },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "200px", textAlign: "center" },
    },
  ];

  const handleHapus = (item) => {
    Swal.fire({
      title: "yakin ingin menghapus user ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(item.id));
      }
    });
  };

  const handleReset = (item) => {
    Swal.fire({
      title: "yakin ingin mereset password user ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetPassword(item.id, item.username));
      }
    });
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Akun
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
            items={dataUser}
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
              aksi: (item) => (
                <>
                  {currentUser.id === item.id ? (
                    <td style={{ textAlign: "center" }}>
                      <CBadge color="success">Sedang login</CBadge>
                    </td>
                  ) : (
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
                        color="danger"
                        onClick={() => handleHapus(item)}
                      >
                        <IoTrashOutline />
                      </CButton>
                    </td>
                  )}
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

export default Akun;
