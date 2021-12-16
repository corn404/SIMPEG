package com.umgo.simpeg_umgo.data.model.upload

data class BerkasResponse(
    val code: Int,
    val status: String,
    val `data`: List<Berkas>
)
