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
import android.widget.Toast
import androidx.appcompat.content.res.AppCompatResources.getDrawable
import androidx.navigation.fragment.findNavController
import com.umgo.simpeg_umgo.MainActivity
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.absen.AbsenResponse
import com.umgo.simpeg_umgo.data.service.API
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


class Pegawai : Fragment(), UploadRequestBody.UploadCallback  {
    private var _binding: FragmentPegawaiBinding? = null
    private val binding get() = _binding
    private lateinit var sharedUsers: SharedUsers
    private lateinit var loading: Dialog

    private val REQUEST_RIWAYAT = 10
    private val REQUEST_SERTIVIKASI = 11

    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentPegawaiBinding.inflate(layoutInflater, container, false)
        sharedUsers = SharedUsers(requireContext())
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

        sharedUsers.let {
            if(it.file_riwayat.isNullOrEmpty()) {
                binding?.containerBerkas1?.visibility = View.VISIBLE
                binding?.containerUpload1?.visibility = View.GONE
            } else {
                binding?.containerBerkas1?.visibility = View.GONE
                binding?.containerUpload1?.visibility = View.VISIBLE
            }

            if(it.file_verifikasi.isNullOrEmpty()) {
                binding?.containerBerkas2?.visibility = View.VISIBLE
                binding?.containerUpload2?.visibility = View.GONE
            } else {
                binding?.containerBerkas2?.visibility = View.GONE
                binding?.containerUpload2?.visibility = View.VISIBLE
            }
        }

        binding?.etRiwayatHidup?.setOnClickListener {
            openFile(REQUEST_RIWAYAT)
        }


        binding?.etSertifikasi?.setOnClickListener {
            openFile(REQUEST_SERTIVIKASI)
        }


        binding?.btnRiwayat?.setOnClickListener {
            openFile(REQUEST_RIWAYAT)
        }


        binding?.btnSertifikasi?.setOnClickListener {
            openFile(REQUEST_SERTIVIKASI)
        }

        binding?.btnHapusRiwayat?.setOnClickListener {
            deleteRiwayat()
        }

        binding?.btnHapusVerifikasi?.setOnClickListener {
            deleteSertifikasi()
        }

        return binding?.root
    }

    private fun deleteRiwayat() {
        loading.show()
        API().deleteRiwayat(sharedUsers.id_pegawai!!.toInt()).enqueue(object : Callback<AbsenResponse> {
            override fun onResponse(call: Call<AbsenResponse>, response: Response<AbsenResponse>) {
                if(response.isSuccessful) {
                    Toast.makeText(requireContext(), "Success!", Toast.LENGTH_SHORT).show()
                    loading.dismiss()
                    binding?.containerBerkas1?.visibility = View.VISIBLE
                    binding?.containerUpload1?.visibility = View.GONE
                    sharedUsers.file_riwayat = ""
                }
            }

            override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                Toast.makeText(requireContext(), "File gagal di hapus, silahkan hubungi admin", Toast.LENGTH_SHORT).show()
                loading.dismiss()
            }

        })
    }

    private fun deleteSertifikasi() {
        loading.show()
        API().deleteSertifikasi(sharedUsers.id_pegawai!!.toInt()).enqueue(object : Callback<AbsenResponse> {
            override fun onResponse(call: Call<AbsenResponse>, response: Response<AbsenResponse>) {
                if(response.isSuccessful) {
                    Toast.makeText(requireContext(), "Success!", Toast.LENGTH_SHORT).show()
                    loading.dismiss()
                    binding?.containerBerkas2?.visibility = View.VISIBLE
                    binding?.containerUpload2?.visibility = View.GONE
                    sharedUsers.file_verifikasi = ""
                }
            }

            override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                Toast.makeText(requireContext(), "File gagal di hapus, silahkan hubungi admin", Toast.LENGTH_SHORT).show()
                loading.dismiss()
            }

        })
    }


    private fun openFile(request: Int) {
        Intent(Intent.ACTION_GET_CONTENT).also {
            it.type = "application/*"
            val mimeTypes = arrayOf("application/pdf")
            it.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes)
            startActivityForResult(Intent.createChooser(it, "Cari File"), request)
        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        when (requestCode) {
            REQUEST_RIWAYAT -> {
                uploadFile(resultCode, data?.data!!, 1)
            }

            REQUEST_SERTIVIKASI -> {
                uploadFile(resultCode, data?.data!!, 2)
            }
        }

    }


    private fun uploadFile(resultCode: Int, uri: Uri, code: Int) {
        var filename = ""
        if (resultCode == Activity.RESULT_OK) {
            val cursor = context?.contentResolver?.query(uri, null, null, null, null)
            val nameIndex = cursor?.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            cursor?.moveToFirst()
            filename = nameIndex?.let { it1 -> cursor.getString(it1) }.toString()

            when (code) {
                1 -> {
                    uploadRiwayat(uri, filename)
                    binding?.etRiwayatHidup?.setText(filename)
                }

                2 -> {
                    uploadSertifikasi(uri, filename)
                    binding?.etSertifikasi?.setText(filename)
                }
            }
        }

        if (resultCode == Activity.RESULT_CANCELED) {
            Toast.makeText(requireContext(), "Batal Cari File", Toast.LENGTH_SHORT).show()
        }
    }


    private fun uploadSertifikasi(fileUri: Uri, filename: String) {
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

        API().uploadSertifikasi(
            sharedUsers.id_pegawai!!.toInt(),
            MultipartBody.Part.createFormData("sertifikasi", filename, requestFile)
        ).enqueue(object : Callback<AbsenResponse> {
            override fun onResponse(
                call: Call<AbsenResponse>,
                response: Response<AbsenResponse>
            ) {
                if (response.isSuccessful) {
                    Toast.makeText(requireContext(), "Upload success", Toast.LENGTH_SHORT).show()
                    sharedUsers.file_verifikasi = response.body()?.data
                    binding?.containerBerkas2?.visibility = View.GONE
                    binding?.containerUpload2?.visibility = View.VISIBLE
                    loading.dismiss()
                }
            }

            override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                Toast.makeText(
                    requireContext(),
                    "Upload Gagal! silahkan hubungi admin",
                    Toast.LENGTH_SHORT
                ).show()
                loading.dismiss()
            }

        })
    }

    private fun uploadRiwayat(fileUri: Uri, filename: String) {
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

        API().uploadRiwayat(
            sharedUsers.id_pegawai!!.toInt(),
            MultipartBody.Part.createFormData("sertifikasi", filename, requestFile)
        ).enqueue(object : Callback<AbsenResponse> {
            override fun onResponse(
                call: Call<AbsenResponse>,
                response: Response<AbsenResponse>
            ) {
                if (response.isSuccessful) {
                    Toast.makeText(requireContext(), "Upload success", Toast.LENGTH_SHORT).show()
                    sharedUsers.file_riwayat = response.body()?.data
                    binding?.containerBerkas1?.visibility = View.GONE
                    binding?.containerUpload1?.visibility = View.VISIBLE
                    loading.dismiss()
                }
            }

            override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                Toast.makeText(
                    requireContext(),
                    "Upload Gagal! silahkan hubungi admin",
                    Toast.LENGTH_SHORT
                ).show()
                loading.dismiss()
            }

        })
    }




    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

    override fun onProgressUpdate(percentage: Int) {
        println(percentage)
    }
}