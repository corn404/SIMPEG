package com.umgo.simpeg_umgo.ui.fragments.Rekap

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.adapter.BulanAdapter
import com.umgo.simpeg_umgo.data.model.absen.Bulan
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel
import com.umgo.simpeg_umgo.databinding.FragmentRekapBinding


class Rekap : Fragment() {
    private var _binding: FragmentRekapBinding? = null
    private val binding get() = _binding

    private lateinit var bulanAdapter: BulanAdapter
    private lateinit var absensiViewModel: AbsensiViewModel
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRekapBinding.inflate(layoutInflater, container, false)
        absensiViewModel = ViewModelProvider(this).get(AbsensiViewModel::class.java)
        bulanAdapter = BulanAdapter(mutableListOf(), requireContext(), absensiViewModel)

        binding?.rvBulan?.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = bulanAdapter
        }

        val bulanArr = ArrayList<Bulan>()

        bulanArr.add(Bulan(1, "Januari"))
        bulanArr.add(Bulan(2, "Februari"))
        bulanArr.add(Bulan(3, "Maret"))
        bulanArr.add(Bulan(4, "April"))
        bulanArr.add(Bulan(5, "Mei"))
        bulanArr.add(Bulan(6, "Juni"))
        bulanArr.add(Bulan(7, "Juli"))
        bulanArr.add(Bulan(8, "Agustus"))
        bulanArr.add(Bulan(9, "September"))
        bulanArr.add(Bulan(10, "Oktober"))
        bulanArr.add(Bulan(11, "November"))
        bulanArr.add(Bulan(12, "Desember"))

        binding?.rvBulan?.adapter?.let { a ->
            if(a is BulanAdapter) {
                a.updateList(bulanArr)
            }
        }



        return binding?.root
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

}