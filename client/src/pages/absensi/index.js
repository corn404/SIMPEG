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
import { IoEye } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAbsensi } from "src/redux/actions/absensi";
import ModalInfo from "./ModalInfo";

const Absensi = () => {
  const dispatch = useDispatch();
  const dataAbsen = useSelector((x) => x.absensi.data);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState(null);
  const [bulan, setBulan] = useState("");

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

  const handleOpenModal = async (bulan, item) => {
    await setBulan(bulan);
    await setItem(item);
    await setModal(true);
  };

  const handleBulanClick = (nama, item) => {
    switch (nama) {
      case "januari": {
        return handleOpenModal("01", item);
      }

      case "februari": {
        return handleOpenModal("02", item);
      }

      case "maret": {
        return handleOpenModal("03", item);
      }

      case "april": {
        return handleOpenModal("04", item);
      }

      case "mei": {
        return handleOpenModal("05", item);
      }

      case "juni": {
        return handleOpenModal("06", item);
      }

      case "juli": {
        return handleOpenModal("07", item);
      }

      case "agustus": {
        return handleOpenModal("08", item);
      }

      case "september": {
        return handleOpenModal("09", item);
      }

      case "oktober": {
        return handleOpenModal("10", item);
      }

      case "november": {
        return handleOpenModal("11", item);
      }
      case "desember": {
        return handleOpenModal("12", item);
      }

      default:
        break;
    }
  };

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
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("januari", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              februari: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("februari", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              maret: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("maret", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              april: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("april", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              mei: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("mei", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              juni: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("juni", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              juli: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("juli", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              agustus: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("agustus", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              september: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("september", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              oktober: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("oktober", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              november: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("november", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
              desember: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleBulanClick("desember", item)}
                  >
                    <IoEye />
                  </CButton>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      {item && (
        <ModalInfo
          modal={modal}
          setModal={setModal}
          item={item}
          bulan={bulan}
        />
      )}
    </>
  );
};

export default Absensi;
