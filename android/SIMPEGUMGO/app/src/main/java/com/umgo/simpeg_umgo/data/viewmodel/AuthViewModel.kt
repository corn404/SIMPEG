package com.umgo.simpeg_umgo.data.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.umgo.simpeg_umgo.data.model.login.LoginRequest
import com.umgo.simpeg_umgo.data.model.login.LoginResponse
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordRequest
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordResponse
import com.umgo.simpeg_umgo.data.service.API
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthViewModel: ViewModel() {
    private var token = MutableLiveData<String>()
    private var error = MutableLiveData<String>()

    init {
        token.postValue("")
        error.postValue("")
    }

    fun login(req: LoginRequest) {
        viewModelScope.launch {
            API().loginPegawai(req).enqueue(object : Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if(response.isSuccessful) {
                        when(response.body()?.status) {
                            "Success" -> {
                                token.postValue(response.body()?.data)
                            }

                            "Error" -> {
                                token.postValue("")
                                error.postValue(response.body()?.data)
                            }
                        }

                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    token.postValue("")
                    error.postValue(t.message)
                }

            })
        }
    }

    fun updatePassword(req: UpdatePasswordRequest) {
        viewModelScope.launch {
            API().updatePassword(req).enqueue(object : Callback<UpdatePasswordResponse> {
                override fun onResponse(
                    call: Call<UpdatePasswordResponse>,
                    response: Response<UpdatePasswordResponse>
                ) {
                    if(response.isSuccessful) {
                        error.postValue("Update Password Success")
                    }
                }

                override fun onFailure(call: Call<UpdatePasswordResponse>, t: Throwable) {
                    error.postValue("Update Password GAGAL")
                }

            })
        }
    }

    fun listenToken() = token
    fun listenError() = error
    fun clearError()  {
        error.postValue("")
    }

}