package com.umgo.simpeg_umgo.ui.login

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Handler
import android.telephony.TelephonyManager
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.auth0.android.jwt.JWT
import com.google.android.material.card.MaterialCardView
import com.umgo.simpeg_umgo.MainActivity
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.login.LoginRequest
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.viewmodel.AuthViewModel

class Login : AppCompatActivity() {
    private lateinit var et_nip: EditText
    private lateinit var et_password: EditText
    private lateinit var loading: Dialog
    private lateinit var btn_login: MaterialCardView
    private lateinit var jwt: JWT
    private lateinit var sharedUsers: SharedUsers
    private lateinit var authViewModel: AuthViewModel
    private var IMEI = ""
    private var REQUEST_PERMISSION = 101

    @SuppressLint("HardwareIds")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        actionBar?.hide()
        supportActionBar?.hide()
        sharedUsers = SharedUsers(this@Login)
        authViewModel = ViewModelProvider(this).get(AuthViewModel::class.java)

        et_nip = findViewById(R.id.et_nip)
        et_password = findViewById(R.id.et_password)
        btn_login = findViewById(R.id.btn_login)

        loading = Dialog(this@Login)
        loading.setContentView(R.layout.loading)
        loading.window?.setBackgroundDrawable(getDrawable(R.drawable.background_modal))
        loading.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        loading.setCancelable(false)

        val telephonyManager = getSystemService(Context.TELEPHONY_SERVICE) as
                TelephonyManager
        if (ActivityCompat.checkSelfPermission(this@Login,
                android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this@Login,
                arrayOf(android.Manifest.permission.READ_PHONE_STATE), REQUEST_PERMISSION)
            return
        }
        IMEI = telephonyManager.deviceId

        btn_login.setOnClickListener {
            loading.show()
            if (et_nip.text.trim().isEmpty() && et_password.text.trim().isEmpty()) {
                Toast.makeText(
                    this@Login,
                    "Username atau password masih kosong",
                    Toast.LENGTH_SHORT
                ).show()
            } else {
                val req = LoginRequest(et_nip.text.toString(), et_password.text.toString(), IMEI)
                authViewModel.login(req)
                authViewModel.listenToken().observe(this@Login, Observer {
                    if (!it.isNullOrEmpty()) {
                        jwt = JWT(it)
                            val id_pegawai = jwt.getClaim("id_pegawai").asString()
                        val nip = jwt.getClaim("nidn").asString()
                        val nama = jwt.getClaim("nama").asString()
                        val kelamin = jwt.getClaim("kelamin").asString()
                        val pendidikan = jwt.getClaim("pendidikan").asString()
                        val jabatan = jwt.getClaim("jabatan").asString()
                        val no_hp = jwt.getClaim("no_hp").asString()
                        val role = jwt.getClaim("role").asString()
                        val sertifikasi = jwt.getClaim("sertifikasi").asString()
                        val riwayat_hidup = jwt.getClaim("riwayat_hidup").asString()
                        val id_pangkat = jwt.getClaim("id_pangkat").asString()
                        val pangkat = "${jwt.getClaim("pangkat").asString()} ${jwt.getClaim("golongan").asString()}/${jwt.getClaim("ruang").asString()}"
                        login(
                            id_pegawai.toString(),
                            nip.toString(),
                            nama.toString(),
                            kelamin.toString(),
                            pendidikan.toString(),
                            jabatan.toString(),
                            no_hp.toString(),
                            role.toString(),
                            riwayat_hidup.toString(),
                            sertifikasi.toString(),
                            id_pangkat.toString(),
                            pangkat
                        )
                    }
                })

                authViewModel.listenError().observe(this@Login, Observer {
                    if (it.isNotEmpty()) {
                        loading.dismiss()
                        Toast.makeText(this@Login, it, Toast.LENGTH_SHORT).show()
                        Handler().postDelayed({
                            authViewModel.clearError()
                        }, 2000)
                    }
                })
            }
        }
    }


    private fun login(
        id_pegawai: String,
        nip: String,
        nama: String,
        kelamin: String,
        pendidikan: String,
        jabatan: String?,
        no_hp: String,
        role: String,
        file_riwayat: String,
        file_verifikasi: String,
        id_pangkat: String,
        pangkat: String
    ) {
        sharedUsers.let {
            it.id_pegawai = id_pegawai
            it.nip = nip
            it.nama = nama
            it.kelamin = kelamin
            it.pendidikan = pendidikan
            it.jabatan = jabatan
            it.no_hp = no_hp
            it.role = role
            it.isLogin = true
            it.file_riwayat = file_riwayat
            it.file_verifikasi = file_verifikasi
            it.id_pangkat = id_pangkat
            it.pangkat = pangkat
        }

        loading.dismiss()
        finish()
        startActivity(Intent(this@Login, MainActivity::class.java))
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when(requestCode) {
            REQUEST_PERMISSION -> {
                if(grantResults.size > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "Permission granted.", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
}