package com.umgo.simpeg_umgo.data.model.absen

data class Rekap(
    val id: Int,
    val tgl_absen: String,
    val id_pegawai: String,
    val status: Int,
    val nip: String,
    val nama: String,
    val kelamin: String,
    val pendidikan: String,
    val no_hp:String
)
