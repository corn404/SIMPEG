package com.umgo.simpeg_umgo.data.adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.absen.Bulan
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel
import com.umgo.simpeg_umgo.ui.RekapList.RekapList

class BulanAdapter(
    private var bulan: MutableList<Bulan>,
    private var context: Context,
    private var absensiViewModel: AbsensiViewModel
):RecyclerView.Adapter<BulanAdapter.ViewHolder>() {

    class ViewHolder(item: View): RecyclerView.ViewHolder(item) {
        val nama_bulan = item.findViewById<TextView>(R.id.nama_bulan)
        val btn_bulan = item.findViewById<MaterialCardView>(R.id.btn_bulan)
        fun bind(data: Bulan, context: Context, absensiViewModel: AbsensiViewModel) {
            nama_bulan.text = data.nama

            btn_bulan.setOnClickListener {
                val i = Intent(context, RekapList::class.java)
                i.putExtra("nama_bulan" , data.nama)
                i.putExtra("id_bulan" , data.id)
                context.startActivity(i)
            }
        }
    }

    fun updateList(data: List<Bulan>) {
        bulan.clear()
        bulan.addAll(data)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.bulan_items, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(bulan[position], context, absensiViewModel)

    override fun getItemCount() = bulan.size
}