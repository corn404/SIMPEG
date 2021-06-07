import {
  CBadge,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import { SOCKET_URL } from "src/redux/actions";

const ModalBerkas = ({ modal, setModal, item }) => {
  const handleClick = (url) => {
    window.open(`${SOCKET_URL}/uploads/${url}`, "_blank");
  };

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Berkas</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {item.sertifikasi === null && item.riwayat_hidup === null ? (
          <p style={{ textAlign: "center" }}>
            Belum ada berkas yang di upload!
          </p>
        ) : (
          <CListGroup>
            {item.sertifikasi !== null && (
              <CListGroupItem className="justify-content-between">
                1. Berkas riwayat hisup
                <CButton
                  size="sm"
                  className="float-right"
                  color="info"
                  onClick={() => handleClick(item.sertifikasi)}
                >
                  Lihat
                </CButton>
              </CListGroupItem>
            )}

            {item.riwayat_hidup !== null && (
              <CListGroupItem className="justify-content-between">
                2. Berkas Sertifikasi
                <CButton
                  size="sm"
                  className="float-right"
                  color="info"
                  onClick={() => handleClick(item.riwayat_hidup)}
                >
                  Lihat
                </CButton>
              </CListGroupItem>
            )}
          </CListGroup>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Keluar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalBerkas;
