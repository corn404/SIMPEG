package com.umgo.simpeg_umgo.ui.fragments.Pegawai

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.databinding.FragmentPegawaiBinding


class Pegawai : Fragment() {
    private var _binding: FragmentPegawaiBinding? = null
    private val binding get() = _binding
    private lateinit var sharedUsers: SharedUsers
    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentPegawaiBinding.inflate(layoutInflater, container, false)
        sharedUsers = SharedUsers(requireContext())


        binding?.textNama?.text = sharedUsers.nama
        binding?.textNip?.text = "NIP : ${sharedUsers.nip}"
        binding?.textJenisKelamin?.text = if(sharedUsers.kelamin == "L")  "Jenis Kelamin : Laki - Laki" else "Jenis Kelamin : Perempuan"
        binding?.textPendidikan?.text = "Pendidikan : ${sharedUsers.pendidikan}"


        return binding?.root
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }
}