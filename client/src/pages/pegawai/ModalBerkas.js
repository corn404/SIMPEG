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
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, SOCKET_URL } from "src/redux/actions";

const ModalBerkas = ({ modal, setModal, item }) => {
  const handleClick = (url) => {
    window.open(`${SOCKET_URL}/uploads/${url}`, "_blank");
  };

  const [file, setFile] = useState([]);

  console.log(item);

  const getData = async () => {
    const result = await axios.get(
      `${BASE_URL}/upload/check-upload?pangkat=${item.id_pangkat}&pegawai=${item.id}`
    );
    await setFile(result.data.data);
    console.log(file);
  };

  useEffect(() => {
    getData();
  }, [modal]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Berkas</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup>
          {file.length > 0 ? (
            <>
              {file.map((x, i) => (
                <CListGroupItem className="justify-content-between">
                  {`${i + 1} . ${x.keterangan}`}
                  <CButton
                    size="sm"
                    className="float-right"
                    color="info"
                    onClick={() => handleClick(x.file)}
                  >
                    Lihat
                  </CButton>
                </CListGroupItem>
              ))}
            </>
          ) : (
            <p style={{ textAlign: "center" }}>
              Belum ada berkas yang di upload!
            </p>
          )}
        </CListGroup>
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
