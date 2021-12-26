package com.umgo.simpeg_umgo.data.model.absen

import java.math.BigDecimal

data class Rek(
    val id: BigDecimal,
    val id_pegawai:Long,
    val tgl_absen: String,
    val status: Long
)