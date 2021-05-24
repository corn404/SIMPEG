package com.umgo.simpeg_umgo.ui.fragments.Profil

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.databinding.FragmentProfilBinding


class ProfilFragment : Fragment() {
    private var _binding: FragmentProfilBinding? = null
    private val binding get() = _binding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfilBinding.inflate(layoutInflater, container, false)


        return binding?.root
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

}