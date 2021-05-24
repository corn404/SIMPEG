package com.umgo.simpeg_umgo.ui.RekapList

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.adapter.RekapAdapter
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel

class RekapList : AppCompatActivity() {
    private lateinit var rv_rekaplist: RecyclerView
    private lateinit var rekapAdapter: RekapAdapter
    private lateinit var absensiViewModel: AbsensiViewModel
    private lateinit var sharedUsers: SharedUsers
    private lateinit var text_kosong: TextView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rekap_list)
        sharedUsers = SharedUsers(this@RekapList)
        absensiViewModel = ViewModelProvider(this@RekapList).get(AbsensiViewModel::class.java)
        rekapAdapter = RekapAdapter(mutableListOf(), this@RekapList, absensiViewModel)
        var nama_bulan = intent.extras?.getString("nama_bulan").toString()
        val id_bulan = intent.extras?.getInt("id_bulan")

        actionBar?.title = nama_bulan
        supportActionBar?.title = nama_bulan

        rv_rekaplist = findViewById(R.id.rv_rekaplist)
        text_kosong = findViewById(R.id.text_kosong)
        text_kosong.visibility = View.GONE

        rv_rekaplist.apply {
            layoutManager = LinearLayoutManager(this@RekapList)
            adapter = rekapAdapter
        }

        absensiViewModel.getRekap(sharedUsers.id_pegawai!!.toInt(), id_bulan.toString().toInt() )

        absensiViewModel.listenRekap().observe(this@RekapList, Observer {
            if(it.isEmpty()) {
                text_kosong.visibility = View.VISIBLE
            } else {
                text_kosong.visibility = View.GONE
            }
            rv_rekaplist.adapter.let { a ->
                if(a is RekapAdapter) {
                    a.updateList(it)
                }
            }
        })


    }
}