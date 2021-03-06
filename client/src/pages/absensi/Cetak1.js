import React, { useEffect } from "react";

export class Cetak1 extends React.PureComponent {
  render() {
    const { data, start, end, item } = this.props;

    const cuti = item.filter((x) => x.status === 0);
    const hadir = item.filter((x) => x.status === 1);
    const absen = item.filter((x) => x.status === 2);
    const libur = item.filter((x) => x.status === 3);

    return (
      <div>
        <div style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>
          <h4 style={{ fontWeight: "bold" }}>REKAPITULASI ABSENSI PEGAWAI</h4>
          <h3 style={{ fontWeight: "bold" }}>
            UNIVERSITAS MUHAMMADIYAH GORONTALO
          </h3>
          <h4 style={{ fontWeight: "bold" }}>
            Tanggal : {start} S/D {end}
          </h4>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="80">
                NO
              </th>
              <th scope="col" width="100">
                NIDN/NIY
              </th>
              <th scope="col">NAMA PEGAWAI</th>
              <th scope="col" style={{ textAlign: "center" }}>
                HADIR
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                CUTI
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                ABSEN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{data.nidn}</td>
              <td>{data.nama}</td>
              <td style={{ textAlign: "center" }}>{hadir.length}</td>
              <td style={{ textAlign: "center" }}>{cuti.length}</td>
              <td style={{ textAlign: "center" }}>{absen.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
