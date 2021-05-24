package com.umgo.simpeg_umgo.data.utils

import android.content.Context
import android.preference.PreferenceManager

class SharedUsers(val context: Context) {
    companion object {
        private const val ID_PEGAWAI = "ID_PEGAWAI"
        private const val NAMA = "NAMA"
        private const val NIP = "NIP"
        private const val KELAMIN = "KELAMIN"
        private const val PENDIDIKAN = "PENDIDIKAN"
        private const val JABATAN = "JABATAN"
        private const val NO_HP = "NO_HP"
        private const val LOGIN = "LOGIN"
        private const val ROLE = "ROLE"
    }

    private val data = PreferenceManager.getDefaultSharedPreferences(context)

    var id_pegawai = data.getString(ID_PEGAWAI, "")
        set(value) = data.edit().putString(ID_PEGAWAI, value).apply()

    var nama = data.getString(NAMA, "")
        set(value) = data.edit().putString(NAMA, value).apply()

    var nip = data.getString(NIP, "")
        set(value) = data.edit().putString(NIP, value).apply()

    var kelamin = data.getString(KELAMIN, "")
        set(value) = data.edit().putString(KELAMIN, value).apply()

    var pendidikan = data.getString(PENDIDIKAN, "")
        set(value) = data.edit().putString(PENDIDIKAN, value).apply()

    var jabatan = data.getString(JABATAN, "")
        set(value) = data.edit().putString(JABATAN, value).apply()

    var isLogin = data.getBoolean(LOGIN, false)
        set(value) = data.edit().putBoolean(LOGIN, value).apply()

    var role = data.getString(ROLE, "")
        set(value) = data.edit().putString(ROLE, value).apply()

    var no_hp = data.getString(NO_HP, "")
        set(value) = data.edit().putString(NO_HP, value).apply()
}