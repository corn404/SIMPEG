package com.umgo.simpeg_umgo.ui.login

import android.app.Dialog
import android.app.ProgressDialog
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
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


        btn_login.setOnClickListener {
            loading.show()
            if (et_nip.text.trim().isEmpty() && et_password.text.trim().isEmpty()) {
                Toast.makeText(
                    this@Login,
                    "Username atau password masih kosong",
                    Toast.LENGTH_SHORT
                ).show()
            } else {
                val req = LoginRequest(et_nip.text.toString(), et_password.text.toString())
                authViewModel.login(req)
                authViewModel.listenToken().observe(this@Login, Observer {
                    if (!it.isNullOrEmpty()) {
                        jwt = JWT(it)
                            val id_pegawai = jwt.getClaim("id_pegawai").asString()
                        val nip = jwt.getClaim("nip").asString()
                        val nama = jwt.getClaim("nama").asString()
                        val kelamin = jwt.getClaim("kelamin").asString()
                        val pendidikan = jwt.getClaim("pendidikan").asString()
                        val jabatan = jwt.getClaim("jabatan").asString()
                        val no_hp = jwt.getClaim("no_hp").asString()
                        val role = jwt.getClaim("role").asString()
                        login(
                            id_pegawai.toString(),
                            nip.toString(),
                            nama.toString(),
                            kelamin.toString(),
                            pendidikan.toString(),
                            jabatan.toString(),
                            no_hp.toString(),
                            role.toString()
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
        role: String
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
        }

        loading.dismiss()
        finish()
        startActivity(Intent(this@Login, MainActivity::class.java))
    }
}