import React, { useEffect } from "react";
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
import { IoPrint } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAbsensi } from "src/redux/actions/absensi";

const Absensi = () => {
  const dispatch = useDispatch();
  const dataAbsen = useSelector((x) => x.absensi.data);

  const columns = [
    { key: "no", label: "NO", _style: { width: "50px", textAlign: "center" } },
    {
      key: "nip",
      label: "NIP",
      _style: { width: "70px" },
    },
    {
      key: "nama",
      label: "NAMA PEGAWAI",
      _style: { width: "200px" },
    },
    {
      key: "januari",
      label: "JAN",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "februari",
      label: "FEB",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "maret",
      label: "MAR",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "april",
      label: "APR",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "mei",
      label: "MEI",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "juni",
      label: "JUN",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "juli",
      label: "JUL",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "agustus",
      label: "AGS",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "september",
      label: "SEPT",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "oktober",
      label: "OKT",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "november",
      label: "NOV",
      _style: { width: "30px", textAlign: "center" },
    },
    {
      key: "desember",
      label: "DES",
      _style: { width: "30px", textAlign: "center" },
    },
  ];

  useEffect(() => {
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
          <CDataTable
            items={dataAbsen}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            pagination
            scopedSlots={{
              no: (item, i) => <td style={{ textAlign: "center" }}>{i + 1}</td>,
              januari: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              februari: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              maret: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              april: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              mei: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              juni: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              juli: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              agustus: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              september: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              oktober: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              november: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
              desember: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton color="info" size="sm">
                    <IoPrint />
                  </CButton>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Absensi;
