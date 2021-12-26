package com.umgo.simpeg_umgo.data.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.umgo.simpeg_umgo.data.model.absen.*
import com.umgo.simpeg_umgo.data.service.API
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AbsensiViewModel: ViewModel() {
    private var rekap = MutableLiveData<List<Rekap>>()
    private var isLoading = MutableLiveData<Boolean>()
    private var messages = MutableLiveData<String>()
    private var rekapAbsen = MutableLiveData<RekResponse?>()

    init {
        rekap.postValue(mutableListOf())
        isLoading.postValue(false)
        messages.postValue("")
        rekapAbsen.postValue(null)
    }


    fun getRekap(pegawai: Int, bulan:String) {
        viewModelScope.launch {
            API().getRekap(pegawai, bulan).enqueue(object : Callback<RekapResponse> {
                override fun onResponse(
                    call: Call<RekapResponse>,
                    response: Response<RekapResponse>
                ) {
                    if(response.isSuccessful) {
                        if(response.body()?.code == 200) {
                            rekap.postValue(response.body()?.data)
                            println(response.body()?.data)
                        } else {
                            rekap.postValue(mutableListOf())
                        }
                    }
                }

                override fun onFailure(call: Call<RekapResponse>, t: Throwable) {
                    rekap.postValue(mutableListOf())
                }

            })
        }
    }

    fun scan(id:Int, token:String) {
        viewModelScope.launch {
            API().scanAbsensi(id, token).enqueue(object : Callback<String> {
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    if(response.isSuccessful) {
                        println("Success")
                    }
                }

                override fun onFailure(call: Call<String>, t: Throwable) {
                    println("Error")
                }

            })
        }
    }

    fun absen(id_pegawai: Int) {
        viewModelScope.launch {
            API().createAbsen(id_pegawai).enqueue(object : Callback<AbsenResponse> {
                override fun onResponse(
                    call: Call<AbsenResponse>,
                    response: Response<AbsenResponse>
                ) {
                    if(response.isSuccessful) {
                        when(response.body()?.status) {
                            "Created" -> {
                                messages.postValue("Success")
                            }

                            "Error" -> {
                                messages.postValue(response.body()?.data)
                            }
                        }
                    }
                }

                override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                    messages.postValue(t.message)
                }

            })
        }
    }

    fun getRekapAbsen(start: String, end: String, pegawai:Long) {
        isLoading.postValue(true)
        viewModelScope.launch {
            API().getRekapAbsen(start, end, pegawai).enqueue(object : Callback<RekResponse> {
                override fun onResponse(call: Call<RekResponse>, response: Response<RekResponse>) {
                    if(response.isSuccessful) {
                        rekapAbsen.postValue(response.body())
                        isLoading.postValue(false)
                    }
                }

                override fun onFailure(call: Call<RekResponse>, t: Throwable) {
                    rekapAbsen.postValue(null)
                    isLoading.postValue(false)
                }

            })
        }
    }

    fun loadingOn() {
        isLoading.postValue(true)
    }

    fun loadingOff() {
        isLoading.postValue(false)
    }

    fun clearMessage() {
        messages.postValue("")
    }


    fun listenRekap() = rekap
    fun listenLoading() = isLoading
    fun listenMessage() = messages
    fun listenRekapAbsen() = rekapAbsen
}