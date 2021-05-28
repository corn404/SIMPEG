package com.umgo.simpeg_umgo.ui.ScanQrcode

import android.content.pm.PackageManager
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.widget.Button
import com.journeyapps.barcodescanner.CaptureManager
import com.journeyapps.barcodescanner.DecoratedBarcodeView
import com.journeyapps.barcodescanner.ViewfinderView
import com.umgo.simpeg_umgo.R
import java.util.*

class ScanQrcode : AppCompatActivity(), DecoratedBarcodeView.TorchListener  {
    private lateinit var capture: CaptureManager
    private lateinit var barcodeScannerView: DecoratedBarcodeView
    private lateinit var switchFlashlightButton: Button
    private lateinit var viewfinderView: ViewfinderView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_scan_qrcode)
        actionBar?.hide()
        supportActionBar?.hide()

        barcodeScannerView = findViewById(R.id.zxing_barcode_scanner)
        barcodeScannerView.setTorchListener(this)

        switchFlashlightButton = findViewById(R.id.switch_flashlight)
        viewfinderView = findViewById(R.id.zxing_viewfinder_view)

        if (!hasFlash()) {
            switchFlashlightButton.setVisibility(View.GONE);
        }

        capture = CaptureManager(this, barcodeScannerView)
        capture.initializeFromIntent(intent, savedInstanceState)
        capture.setShowMissingCameraPermissionDialog(false)
        capture.decode()
        changeMaskColor(null);
        changeLaserVisibility(true);
    }

    override fun onTorchOn() {
        switchFlashlightButton.setText(R.string.turn_off_flashlight);
    }

    override fun onTorchOff() {
        switchFlashlightButton.setText(R.string.turn_on_flashlight);
    }

    private fun hasFlash(): Boolean {
        return applicationContext.packageManager
            .hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH)
    }

    override fun onResume() {
        super.onResume()
        capture.onResume()
    }

    override fun onPause() {
        super.onPause()
        capture.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        capture.onDestroy()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        capture.onSaveInstanceState(outState);
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        return barcodeScannerView.onKeyDown(keyCode, event) || super.onKeyDown(keyCode, event)
    }

    fun switchFlashlight(view: View?) {
        if (getString(R.string.turn_on_flashlight) == switchFlashlightButton.text) {
            barcodeScannerView.setTorchOn()
        } else {
            barcodeScannerView.setTorchOff()
        }
    }


    fun changeMaskColor(view: View?) {
        val rnd = Random()
        val color: Int = Color.argb(100, rnd.nextInt(256), rnd.nextInt(256), rnd.nextInt(256))
        viewfinderView.setMaskColor(color)
    }

    fun changeLaserVisibility(visible: Boolean) {
        viewfinderView.setLaserVisibility(visible)
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        capture.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}