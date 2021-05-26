package com.umgo.simpeg_umgo.data.service

import com.umgo.simpeg_umgo.data.model.absen.AbsenResponse
import com.umgo.simpeg_umgo.data.model.absen.RekapResponse
import com.umgo.simpeg_umgo.data.model.absen.ScanRequest
import com.umgo.simpeg_umgo.data.model.login.LoginRequest
import com.umgo.simpeg_umgo.data.model.login.LoginResponse
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordRequest
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordResponse
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface API {

    @POST("pegawai/login")
    fun loginPegawai(@Body req: LoginRequest): Call<LoginResponse>

    @GET("absensi/pegawai")
    fun getRekap(@Query("pegawai") pegawai: Int, @Query("bulan") bulan: Int):Call<RekapResponse>

    @GET("absensi/scan")
    fun scanAbsensi(@Query("id") id:Int, @Query("token") token:String): Call<String>

    @POST("absensi/{id_pegawai}")
    fun createAbsen(@Path("id_pegawai") id_pegawai: Int): Call<AbsenResponse>


    @PUT("pegawai/update")
    fun updatePassword(@Body req: UpdatePasswordRequest): Call<UpdatePasswordResponse>

    companion object {
        val BASE_URL = "http://192.168.43.217:5000/api/v1/"
        val URL_SOCKETS = "http://192.168.43.217:5000"
        operator fun invoke(): API {
            return Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL)
                .build()
                .create(API::class.java)
        }
    }
}