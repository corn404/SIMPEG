package com.umgo.simpeg_umgo.ui.fragments.Rekap

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.observe
import com.google.android.material.datepicker.MaterialDatePicker
import com.umgo.simpeg_umgo.data.adapter.BulanAdapter
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel
import com.umgo.simpeg_umgo.databinding.FragmentRekapBinding
import java.text.SimpleDateFormat
import java.util.*


class Rekap : Fragment() {
    private var _binding: FragmentRekapBinding? = null
    private val binding get() = _binding!!

    private lateinit var bulanAdapter: BulanAdapter
    private lateinit var absensiViewModel: AbsensiViewModel
    private lateinit var sharedUsers: SharedUsers
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRekapBinding.inflate(layoutInflater, container, false)
        absensiViewModel = ViewModelProvider(this).get(AbsensiViewModel::class.java)
        sharedUsers = SharedUsers(requireContext())
        val dateA = SimpleDateFormat("yyyy-MM-dd")
        val dateB = SimpleDateFormat("yyyy-MM-dd")
        val timeA = Date(Calendar.getInstance().timeInMillis)
        val timeB = Date(Calendar.getInstance().timeInMillis)
        binding.textTanggal.setText("${dateA.format(timeA)} S/D ${dateB.format(timeB)}")

        absensiViewModel.getRekapAbsen(
            dateA.format(timeA),
            dateB.format(timeB),
            sharedUsers.id_pegawai.toString().toLong()
        )

        val dateRangePicker =
            MaterialDatePicker.Builder.dateRangePicker()
                .setTitleText("Pilih Tanggal")
                .setSelection(
                    androidx.core.util.Pair(
                        MaterialDatePicker.thisMonthInUtcMilliseconds(),
                        MaterialDatePicker.todayInUtcMilliseconds()
                    )
                )
                .build()

        binding.tlTanggal.setEndIconOnClickListener {
            dateRangePicker.show(activity?.supportFragmentManager!!, dateRangePicker.toString())
        }

        dateRangePicker.addOnPositiveButtonClickListener {
            val dateA = SimpleDateFormat("yyyy-MM-dd")
            val dateB = SimpleDateFormat("yyyy-MM-dd")
            val timeA = Date(it.first!!)
            val timeB = Date(it.second!!)
            binding.textTanggal.setText("${dateA.format(timeA)} S/D ${dateB.format(timeB)}")
            absensiViewModel.getRekapAbsen(
                dateA.format(timeA),
                dateB.format(timeB),
                sharedUsers.id_pegawai.toString().toLong()
            )
        }

//        var hadir = 0
//        var cuti = 0
//        var absen = 0

        absensiViewModel.listenRekapAbsen().observe(viewLifecycleOwner) {

            if (absensiViewModel.listenRekapAbsen().value != null) {
                Toast.makeText(requireContext(),  it!!.data.size.toString(), Toast.LENGTH_SHORT).show()
                binding.textHadir.text = "${it!!.data.filter { a -> a.status == 1L }.size}"
                binding.textCuti.text = it!!.data.filter { a -> a.status == 0L }.size.toString()
                binding.textAbsen.text = "${it!!.data.filter { a -> a.status == 2L }.size}"
            }
        }


        return binding.root
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

}