package com.umgo.simpeg_umgo.data.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.absen.Rekap
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel
import java.text.SimpleDateFormat
import java.util.*
import java.util.logging.SimpleFormatter

class RekapAdapter(
    private var rekap: MutableList<Rekap>,
    private var context: Context,
    private var absensiViewModel: AbsensiViewModel
): RecyclerView.Adapter<RekapAdapter.ViewHolder>() {


    class ViewHolder(item: View):RecyclerView.ViewHolder(item) {
        val text_hari = item.findViewById<TextView>(R.id.text_hari)
        val text_tanggal = item.findViewById<TextView>(R.id.text_tanggal)
        val status_hadir = item.findViewById<MaterialCardView>(R.id.status_hadir)
        val status_absen = item.findViewById<MaterialCardView>(R.id.status_absen)
        @SuppressLint("SimpleDateFormat")
        fun bind(data: Rekap, context: Context, absensiViewModel: AbsensiViewModel) {
            val parse = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
            val formatHari = SimpleDateFormat("EEEE")
            val formatBulan = SimpleDateFormat("dd MMMM yyyy")
            text_hari.text = formatHari.format(parse.parse(data.tgl_absen))
            text_tanggal.text = formatBulan.format(parse.parse(data.tgl_absen))

            when(data.status) {
                1 -> {
                    status_hadir.visibility = View.VISIBLE
                    status_absen.visibility = View.GONE
                }

                2 -> {
                    status_hadir.visibility = View.GONE
                    status_absen.visibility = View.VISIBLE
                }
            }

        }
    }

    fun updateList(data: List<Rekap>) {
        rekap.clear()
        rekap.addAll(data)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.rekap_items, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(rekap[position], context, absensiViewModel)

    override fun getItemCount() = rekap.size
}