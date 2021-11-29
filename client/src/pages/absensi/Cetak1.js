import React, { useEffect } from "react";

export class Cetak1 extends React.PureComponent {
  render() {
    const tanggalArr = [];
    const { data } = this.props;

    return (
      <div>
        <style type="text/css" media="print">
          {"@media print{@page {size: landscape}}"}
        </style>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="80">
                NO
              </th>
              <th scope="col" width="200">
                NIDN/NIY
              </th>
              <th scope="col" width="400">
                NAMA PEGAWAI
              </th>
              {data && (
                <>
                  {data.dataArr.map((x) => (
                    <th scope="col">
                      <tr style={{ textAlign: "center" }}>{x.hari}</tr>
                      <tr style={{ textAlign: "center" }}>{x.tanggal}</tr>
                    </th>
                  ))}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data && (
              <tr>
                <th scope="row">1</th>
                <td>{data.nidn}</td>
                <td>{data.nama}</td>
                {data.dataArr.map((x) => (
                  <td>{x.hari === "M" ? "x" : "0"}</td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
