package com.umgo.simpeg_umgo.ui.fragments.Pegawai

import android.annotation.SuppressLint
import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.umgo.simpeg_umgo.MainActivity
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.adapter.BerkasAdapter
import com.umgo.simpeg_umgo.data.model.absen.AbsenResponse
import com.umgo.simpeg_umgo.data.model.upload.BerkasResponse
import com.umgo.simpeg_umgo.data.model.upload.UploadReq
import com.umgo.simpeg_umgo.data.service.API
import com.umgo.simpeg_umgo.data.utils.ItemClickListener
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.utils.UploadRequestBody
import com.umgo.simpeg_umgo.databinding.FragmentPegawaiBinding
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream


class Pegawai : Fragment(), UploadRequestBody.UploadCallback, ItemClickListener {
    private var _binding: FragmentPegawaiBinding? = null
    private val binding get() = _binding
    private lateinit var sharedUsers: SharedUsers
    private lateinit var loading: Dialog

    private val REQUEST_FILE = 10
    private var ID_BERKAS = 0


    private lateinit var berkasAdapter: BerkasAdapter

    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentPegawaiBinding.inflate(layoutInflater, container, false)
        sharedUsers = SharedUsers(requireContext())
        berkasAdapter = BerkasAdapter(mutableListOf(), requireContext(), sharedUsers, this)
        loading = Dialog(requireContext())
        loading.setContentView(R.layout.loading)
        loading.window?.setBackgroundDrawable(context?.getDrawable(R.drawable.background_modal))
        loading.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        loading.setCancelable(false)

        binding?.textNama?.text = sharedUsers.nama
        binding?.textNip?.text = "NIDN/NIY : ${sharedUsers.nip}"
        binding?.textJenisKelamin?.text =
            if (sharedUsers.kelamin == "L") "Jenis Kelamin : Laki - Laki" else "Jenis Kelamin : Perempuan"
        binding?.textPendidikan?.text = "Pendidikan : ${sharedUsers.pendidikan}"
        binding?.textPangkat?.text = "Pangkat : ${sharedUsers.pangkat}"

        binding?.rvBerkas?.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = berkasAdapter
        }

       checkUpload()

        binding!!.imageView2.setOnClickListener {
            openBerkas()
        }

        return binding?.root
    }



    fun openBerkas() {
        Intent(Intent.ACTION_GET_CONTENT).also {
            it.type = "application/*"
            val mimeTypes = arrayOf("application/pdf")
            it.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes)
            startActivityForResult(Intent.createChooser(it, "Cari File"), REQUEST_FILE)
        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if(requestCode == REQUEST_FILE) {
            uploadFile(resultCode, data?.data!!)
        }
    }


    private fun uploadFile(resultCode: Int, uri: Uri) {
        var filename = ""
        if (resultCode == Activity.RESULT_OK) {
            val cursor = context?.contentResolver?.query(uri, null, null, null, null)
            val nameIndex = cursor?.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            cursor?.moveToFirst()
            filename = nameIndex?.let { it1 -> cursor.getString(it1) }.toString()
            uploadBerkas(uri, filename)
        }
    }




    private fun uploadBerkas(fileUri: Uri, filename: String) {
        loading.show()
        val parcelFileDescriptor =
            context?.contentResolver?.openFileDescriptor(fileUri!!, "r", null) ?: return

        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File((context as MainActivity).cacheDir, filename)
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)
        val requestFile = RequestBody.create(
            context?.contentResolver?.getType(fileUri!!).toString().toMediaTypeOrNull(),
            file
        )

        val map: HashMap<String, RequestBody> = HashMap()
        map["mapping"] = createPartFromString(ID_BERKAS.toString())
        map["pegawai"] = createPartFromString(sharedUsers.id_pegawai.toString())


        API().uploadBerkas(
            map,
            MultipartBody.Part.createFormData("file", filename, requestFile)
        ).enqueue(object : Callback<AbsenResponse> {
            override fun onResponse(call: Call<AbsenResponse>, response: Response<AbsenResponse>) {
                println("UPLOAD =============+>>>")
                if(response.isSuccessful) {
                    loading.dismiss()

                    checkUpload()
                }
            }

            override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                loading.dismiss()

                println("GAGAL UPLOAD +==============+>>>")
                checkUpload()
            }

        })
    }


    fun checkUpload() {
        API().checkUploadBerkas(sharedUsers.id_pegawai.toString().toInt(), sharedUsers.id_pangkat.toString().toInt()).enqueue(object : Callback<BerkasResponse> {
            override fun onResponse(
                call: Call<BerkasResponse>,
                response: Response<BerkasResponse>
            ) {
                if(response.isSuccessful) {
                    binding?.rvBerkas?.adapter.let { a ->
                        if(a is BerkasAdapter) {
                            a.updateList(response.body()!!.data)
                        }
                    }
                }
            }

            override fun onFailure(call: Call<BerkasResponse>, t: Throwable) {}

        })
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

    override fun onProgressUpdate(percentage: Int) {
        println(percentage)
    }

    override fun onClick(id: Int) {
        ID_BERKAS = id
        openBerkas()
    }

    private fun createPartFromString(param: String): RequestBody {
        return RequestBody.create("multipart/form-data".toMediaTypeOrNull(), param)
    }
}