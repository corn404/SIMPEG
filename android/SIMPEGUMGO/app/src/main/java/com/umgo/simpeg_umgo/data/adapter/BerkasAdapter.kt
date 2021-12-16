package com.umgo.simpeg_umgo.data.adapter

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.upload.Berkas
import com.umgo.simpeg_umgo.data.utils.ItemClickListener
import com.umgo.simpeg_umgo.data.utils.SharedUsers

class BerkasAdapter(
    private var berkas: MutableList<Berkas>,
    private var context: Context,
    private var sharedUsers: SharedUsers,
    val itemClickListener: ItemClickListener
): RecyclerView.Adapter<BerkasAdapter.ViewHolder>() {

    class ViewHolder(item: View):RecyclerView.ViewHolder(item) {
        val nama = item.findViewById<TextView>(R.id.text_nama_berkas)
        val btnUpload = item.findViewById<MaterialCardView>(R.id.btnUpload)
        val checkList = item.findViewById<ImageView>(R.id.checklist)
        fun bind(data: Berkas, context: Context, sharedUsers: SharedUsers, itemClickListener: ItemClickListener) {
            nama.text = data.keterangan
            if(data.status) {
                btnUpload.visibility = View.GONE
                checkList.visibility = View.VISIBLE
            } else {
                btnUpload.visibility = View.VISIBLE
                checkList.visibility = View.GONE
            }

            sharedUsers.idMapping = data.id

            btnUpload.setOnClickListener {
                itemClickListener.onClick(data.id)
            }
        }
    }



    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.berkas_items, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(berkas[position], context, sharedUsers, itemClickListener)

    override fun getItemCount() = berkas.size

    @SuppressLint("NotifyDataSetChanged")
    fun updateList(data: List<Berkas>) {
        berkas.clear()
        berkas.addAll(data)
        notifyDataSetChanged()
    }



}