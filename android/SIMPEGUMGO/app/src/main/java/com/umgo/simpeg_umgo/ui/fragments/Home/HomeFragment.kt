package com.umgo.simpeg_umgo.ui.fragments.Home

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.media.MediaPlayer
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.google.zxing.integration.android.IntentIntegrator
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.model.upload.CheckResponse
import com.umgo.simpeg_umgo.data.service.API
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel
import com.umgo.simpeg_umgo.databinding.FragmentHomeBinding
import com.umgo.simpeg_umgo.ui.ScanQrcode.ScanQrcode
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class HomeFragment : Fragment() {
    private lateinit var initScan: IntentIntegrator
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding
    private lateinit var absensiViewModel: AbsensiViewModel
    private lateinit var sharedUsers: SharedUsers
    private lateinit var loading: Dialog
    private lateinit var checkUpload: Dialog
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        absensiViewModel = ViewModelProvider(requireActivity()).get(AbsensiViewModel::class.java)
        sharedUsers = SharedUsers(requireContext())
        initScan = IntentIntegrator.forSupportFragment(this)

        binding?.btnAbsensi?.setOnClickListener {
            initScan.setCaptureActivity(ScanQrcode::class.java)
            initScan.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE);
            initScan.setPrompt("Scan a barcode");
            initScan.setCameraId(0);  // Use a specific camera of the device
            initScan.setBeepEnabled(false);
            initScan.setBarcodeImageEnabled(true);
            initScan.initiateScan();
        }


        checkUpload = Dialog(requireContext())
        checkUpload.setContentView(R.layout.modal_info_upload)
        checkUpload.window?.setBackgroundDrawable(context?.getDrawable(R.drawable.background_modal))
        checkUpload.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        checkUpload.setCancelable(true)
        val btnOk = checkUpload.findViewById<Button>(R.id.buttonOk)

        btnOk.setOnClickListener {
            checkUpload.dismiss()
            findNavController().navigate(R.id.action_homeFragment2_to_pegawai)
        }

        API().checkUpload(sharedUsers.id_pegawai.toString().toInt(), sharedUsers.id_pangkat.toString().toInt()).enqueue(object:
            Callback<CheckResponse> {
            override fun onResponse(call: Call<CheckResponse>, response: Response<CheckResponse>) {
                if(response.isSuccessful) {
                    if(response.body()!!.status.equals("Belum Upload")) {
                        checkUpload.show()
                    } else {
                        checkUpload.dismiss()
                    }
                }
            }

            override fun onFailure(call: Call<CheckResponse>, t: Throwable) {
                checkUpload.dismiss()
            }

        })

        loading = Dialog(requireContext())
        loading.setContentView(R.layout.loading)
        loading.window?.setBackgroundDrawable(context?.getDrawable(R.drawable.background_modal))
        loading.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        loading.setCancelable(false)

        binding?.btnDataPegawai?.setOnClickListener {
            findNavController().navigate(R.id.action_homeFragment2_to_pegawai)
        }

        binding?.btnPetunjuk?.setOnClickListener {
            findNavController().navigate(R.id.action_homeFragment2_to_petunjuk)
        }

        binding?.btnRekap?.setOnClickListener {
            findNavController().navigate(R.id.action_homeFragment2_to_rekap)
        }

        absensiViewModel.listenLoading().observe(viewLifecycleOwner, Observer {
            if(it) {
                loading.show()
            } else {
                loading.dismiss()
            }
        })

        absensiViewModel.listenMessage().observe(viewLifecycleOwner, Observer {
            if(it.isNotEmpty()) {
                absensiViewModel.loadingOff()
                Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
                Handler(Looper.getMainLooper()).postDelayed({
                    absensiViewModel.clearMessage()
                }, 2000)
            }
        })


        return binding?.root
    }

    override fun onResume() {
        super.onResume()
        API().checkUpload(sharedUsers.id_pegawai.toString().toInt(), sharedUsers.id_pangkat.toString().toInt()).enqueue(object:
            Callback<CheckResponse> {
            override fun onResponse(call: Call<CheckResponse>, response: Response<CheckResponse>) {
                if(response.isSuccessful) {
                    if(response.body()!!.status.equals("Belum Upload")) {
                        checkUpload.show()
                    } else {
                        checkUpload.dismiss()
                    }
                }
            }

            override fun onFailure(call: Call<CheckResponse>, t: Throwable) {
                checkUpload.dismiss()
            }

        })
    }




    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        val result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if(result != null) {
            if(result.contents == null) {
                Toast.makeText(requireContext(), "Silahkan coba lagi", Toast.LENGTH_SHORT).show()
            } else {
                absensiViewModel.scan(id = sharedUsers.id_pegawai!!.toInt(), token = result.contents)
                absensiViewModel.loadingOn()
            }
        }
        super.onActivityResult(requestCode, resultCode, data)
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

}