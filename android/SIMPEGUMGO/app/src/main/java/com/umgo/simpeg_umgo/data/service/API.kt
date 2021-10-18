package com.umgo.simpeg_umgo.data.service

import com.umgo.simpeg_umgo.data.model.upload.CheckResponse
import com.umgo.simpeg_umgo.data.model.absen.AbsenResponse
import com.umgo.simpeg_umgo.data.model.absen.RekapResponse
import com.umgo.simpeg_umgo.data.model.login.LoginRequest
import com.umgo.simpeg_umgo.data.model.login.LoginResponse
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordRequest
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordResponse
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface API {

    @POST("pegawai/login")
    fun loginPegawai(@Body req: LoginRequest): Call<LoginResponse>

    @GET("absensi/pegawai")
    fun getRekap(@Query("pegawai") pegawai: Int, @Query("bulan") bulan: String):Call<RekapResponse>

    @GET("absensi/scan")
    fun scanAbsensi(@Query("id") id:Int, @Query("token") token:String): Call<String>

    @POST("absensi/{id_pegawai}")
    fun createAbsen(@Path("id_pegawai") id_pegawai: Int): Call<AbsenResponse>

    @PUT("pegawai/update")
    fun updatePassword(@Body req: UpdatePasswordRequest): Call<UpdatePasswordResponse>

    @Multipart
    @POST("upload/sertifikasi/{id}")
    fun uploadSertifikasi(@Path("id") id:Int, @Part file: MultipartBody.Part): Call<AbsenResponse>

    @Multipart
    @POST("upload/riwayat/{id}")
    fun uploadRiwayat(@Path("id") id:Int, @Part file: MultipartBody.Part): Call<AbsenResponse>

    @DELETE("upload/sertifikasi/{id}")
    fun deleteSertifikasi(@Path("id") id:Int): Call<AbsenResponse>

    @DELETE("upload/riwayat/{id}")
    fun deleteRiwayat(@Path("id") id:Int): Call<AbsenResponse>

    @GET("upload/check")
    fun checkUpload(@Query("pegawai") pegawai: Int, @Query("pangkat") pangkat: Int): Call<CheckResponse>

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