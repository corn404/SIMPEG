package com.umgo.simpeg_umgo.ui.fragments.Berkas

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.umgo.simpeg_umgo.MainActivity
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.absen.AbsenResponse
import com.umgo.simpeg_umgo.data.service.API
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.utils.UploadRequestBody
import com.umgo.simpeg_umgo.databinding.FragmentBerkasBinding
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class Berkas : Fragment(), UploadRequestBody.UploadCallback {
    private var _binding: FragmentBerkasBinding? = null
    private val binding get() = _binding
    private lateinit var sharedUsers: SharedUsers
    private val REQUEST_FILE = 20
    private var fileUri: Uri? = null
    private var filename = ""
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentBerkasBinding.inflate(inflater, container, false)
        sharedUsers = SharedUsers(requireContext())


        binding?.btnPolih?.setOnClickListener {
            Intent(Intent.ACTION_GET_CONTENT).also {
                it.type = "application/*"
                val mimeTypes = arrayOf("application/pdf")
                it.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes)
                startActivityForResult(Intent.createChooser(it, "Cari File"), REQUEST_FILE)
            }
        }


        binding?.btnUpload?.setOnClickListener {
            if (fileUri == null) {
                Toast.makeText(requireContext(), "Belum ada file", Toast.LENGTH_SHORT)
                    .show()
                return@setOnClickListener
            }
            val parcelFileDescriptor = context?.contentResolver?.openFileDescriptor(fileUri!!, "r", null) ?: return@setOnClickListener

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
                    if(response.isSuccessful) {
                        Toast.makeText(requireContext(), "Upload success", Toast.LENGTH_SHORT).show()
                        findNavController().navigate(R.id.action_berkas2_to_homeFragment2)
                    }
                }

                override fun onFailure(call: Call<AbsenResponse>, t: Throwable) {
                    Toast.makeText(requireContext(), "Upload Gagal! silahkan hubungi admin", Toast.LENGTH_SHORT).show()
                }

            })
        }




        return binding?.root
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_FILE) {
            if (resultCode == Activity.RESULT_OK) {
                fileUri = data?.data!!
                println(data?.data!!)
                val cursor = context?.contentResolver?.query(data.data!!, null, null, null, null)
                val nameIndex = cursor?.getColumnIndex(OpenableColumns.DISPLAY_NAME)

                cursor?.moveToFirst()
                filename = nameIndex?.let { it1 -> cursor.getString(it1) }.toString()
                binding?.etFile?.setText(filename)
            }

            if (resultCode == Activity.RESULT_CANCELED) {
                Toast.makeText(requireContext(), "Batal Cari File", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onProgressUpdate(percentage: Int) {}


}