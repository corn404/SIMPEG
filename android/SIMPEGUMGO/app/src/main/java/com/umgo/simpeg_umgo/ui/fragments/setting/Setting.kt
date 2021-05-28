package com.umgo.simpeg_umgo.ui.fragments.setting

import android.os.Bundle
import android.os.Handler
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.google.android.material.card.MaterialCardView
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.login.UpdatePasswordRequest
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.viewmodel.AuthViewModel
import com.umgo.simpeg_umgo.databinding.FragmentSettingBinding


class Setting : Fragment() {
    private var _binding: FragmentSettingBinding? = null
    private val binding get() = _binding

    private lateinit var authViewModel: AuthViewModel
    private lateinit var sharedUsers: SharedUsers
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentSettingBinding.inflate(layoutInflater, container, false)
        sharedUsers = SharedUsers(requireContext())
        authViewModel = ViewModelProvider(requireActivity()).get(AuthViewModel::class.java)
        binding?.btnUpdate?.setOnClickListener {
            if(binding!!.etPassword.text.trim().isEmpty()) {
                Toast.makeText(requireContext(), "Password masih kosong", Toast.LENGTH_SHORT).show()
            } else {
                val req = UpdatePasswordRequest(sharedUsers!!.id_pegawai.toString().toInt(), binding!!.etPassword.text.trim().toString())
                authViewModel.updatePassword(req)
                authViewModel.listenError().observe(viewLifecycleOwner, Observer {
                    if(it.isNotEmpty()) {
                        Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
                        findNavController().navigate(R.id.action_setting_to_homeFragment2)
                    }

                    Handler().postDelayed({
                        authViewModel.clearError()
                    }, 2000)

                })
            }
        }


        return binding?.root
    }

}