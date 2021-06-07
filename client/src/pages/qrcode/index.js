import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import cryptoRandomString from "crypto-random-string";
import io from "socket.io-client";
import { BASE_URL, SOCKET_URL } from "../../redux/actions";
import axios from "axios";
// import LOGO from "../../assets/img/logo.png";
const socket = io(SOCKET_URL);

function ScanQrcode() {
  const [id, setId] = useState(cryptoRandomString({ length: 10 }));
  const [num, setNum] = useState(10);
  let intervalRef = useRef();
  socket.on("connect", () => {
    setId(socket.id);
  });

  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    socket.on("scan", (data) => {
      if (data.token === id) {
        console.log("SAMA");
        axios.get(`${BASE_URL}/absensi/scan-verify/${data.id}`);
      }
    });

    if (num < 1) {
      window.location.reload();
    }
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 400,
          backgroundColor: "#FFFF",
          position: "absolute",
          top: "50%",
          left: "50%",
          padding: 20,
          borderRadius: 10,
          transform: "translate(-50%, -50%)",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          Silahkan Scan QrCode ini untuk melakukan absen
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <QRCode size={250} value={`${id}`} qrStyle="squares" />
        </div>
        <p style={{ textAlign: "center", fontSize: 20 }}>{num}</p>

        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: 1,
            marginTop: 20,
          }}
        >
          SIMPEG Universitas Muhammadiyah Gorontalo
        </p>
      </div>
    </div>
  );
}

export default ScanQrcode;
