package com.umgo.simpeg_umgo.data.model.absen

data class RekapResponse(
    val code: Int,
    val status: String,
    val `data`: List<Rekap>
)
