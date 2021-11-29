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
} from "@coreui/react";
import { IoEye, IoFolderOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getAbsensi } from "src/redux/actions/absensi";
import ModalInfo from "./ModalInfo";
import { cibElasticStack, cibLetsEncrypt } from "@coreui/icons";
import { Cetak1 } from "./Cetak1";

const Absensi = () => {
  const dispatch = useDispatch();
  const dataAbsen = useSelector((x) => x.absensi.data);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState(null);
  const [bulan, setBulan] = useState("");

  const [selectPegawai, setSelectPegawai] = useState(null);

  const cetak1Ref = useRef();

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

  const handleOpenModal = async (bulan, item) => {
    await setBulan(bulan);
    await setItem(item);
    await setModal(true);
  };

  const handlePrint = useReactToPrint({
    content: () => cetak1Ref.current,
  });

  const handleCetak = async (item) => {
    const tanggalArr = [];
    let start = new Date("11-1-2021").getDate();
    let end = new Date().getDate();

    for (let i = start; i <= end; i++) {
      let tanggal = new Date(`11-${i}-2021`).getDay();
      let tanggal2 = new Date(`11-${i}-2021`).getDate();
      let hari = "";
      if (tanggal == 1) {
        hari = "SN";
      }

      if (tanggal == 2) {
        hari = "SL";
      }

      if (tanggal == 3) {
        hari = "RB";
      }

      if (tanggal == 4) {
        hari = "KM";
      }

      if (tanggal == 5) {
        hari = "JM";
      }

      if (tanggal == 6) {
        hari = "SB";
      }

      if (tanggal == 0) {
        hari = "M";
      }

      tanggalArr.push({
        hari: hari,
        tanggal: tanggal2,
        libur: tanggal == 0 ? true : false,
      });
    }
    await setSelectPegawai({ ...item, dataArr: tanggalArr });

    await handlePrint();
  };

  // const handleBulanClick = (nama, item) => {
  //   switch (nama) {
  //     case "januari": {
  //       return handleOpenModal("01", item);
  //     }

  //     case "februari": {
  //       return handleOpenModal("02", item);
  //     }

  //     case "maret": {
  //       return handleOpenModal("03", item);
  //     }

  //     case "april": {
  //       return handleOpenModal("04", item);
  //     }

  //     case "mei": {
  //       return handleOpenModal("05", item);
  //     }

  //     case "juni": {
  //       return handleOpenModal("06", item);
  //     }

  //     case "juli": {
  //       return handleOpenModal("07", item);
  //     }

  //     case "agustus": {
  //       return handleOpenModal("08", item);
  //     }

  //     case "september": {
  //       return handleOpenModal("09", item);
  //     }

  //     case "oktober": {
  //       return handleOpenModal("10", item);
  //     }

  //     case "november": {
  //       return handleOpenModal("11", item);
  //     }
  //     case "desember": {
  //       return handleOpenModal("12", item);
  //     }

  //     default:
  //       break;
  //   }
  // };

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

              aksi: (item) => (
                <>
                  <td style={{ textAlign: "center" }}>
                    <CButton
                      size="sm"
                      color="success"
                      onClick={() => handleCetak(item)}
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
      {item && (
        <ModalInfo
          modal={modal}
          setModal={setModal}
          item={item}
          bulan={bulan}
        />
      )}

      <div style={{ display: "none" }}>
        <Cetak1 ref={cetak1Ref} data={selectPegawai && selectPegawai} />
      </div>
    </>
  );
};

export default Absensi;
