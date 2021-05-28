package com.umgo.simpeg_umgo.ui.fragments.Petunjuk

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.databinding.FragmentPetunjukBinding

class Petunjuk : Fragment() {
    private var _binding: FragmentPetunjukBinding? = null
    private val binding get() = _binding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentPetunjukBinding.inflate(layoutInflater, container, false)


        return binding?.root
    }


    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

}
