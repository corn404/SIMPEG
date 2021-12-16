package com.umgo.simpeg_umgo.data.model.upload

data class Berkas(
    val id: Int,
    val id_pangkat: Int,
    val keterangan: String,
    val status: Boolean,
    val file: String
)
