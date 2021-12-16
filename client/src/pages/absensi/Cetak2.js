import React, { useEffect } from "react";

export class Cetak2 extends React.PureComponent {
  render() {
    const { data, start, end } = this.props;

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
            {data &&
              data.map((items, i) => {
                const cuti = items.absensi.filter((x) => x.status === 0);
                const hadir = items.absensi.filter((x) => x.status === 1);
                const absen = items.absensi.filter((x) => x.status === 2);
                const libur = items.absensi.filter((x) => x.status === 3);
                console.log(cuti);
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{items.nidn}</td>
                    <td>{items.nama}</td>
                    <td style={{ textAlign: "center" }}>{hadir.length}</td>
                    <td style={{ textAlign: "center" }}>{cuti.length}</td>
                    <td style={{ textAlign: "center" }}>{absen.length}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
