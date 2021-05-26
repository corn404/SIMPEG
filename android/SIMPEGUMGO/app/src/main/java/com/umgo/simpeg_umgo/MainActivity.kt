package com.umgo.simpeg_umgo

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.widget.Toolbar
import androidx.drawerlayout.widget.DrawerLayout
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.navigation.NavigationView
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.data.utils.SocketIO
import com.umgo.simpeg_umgo.data.viewmodel.AbsensiViewModel
import com.umgo.simpeg_umgo.ui.login.Login
import io.socket.emitter.Emitter

class MainActivity : AppCompatActivity() {
    private lateinit var navController: NavController
    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var sharedUsers: SharedUsers
    private lateinit var socketIO: SocketIO
    private lateinit var absensiViewModel: AbsensiViewModel

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        socketIO = SocketIO(this@MainActivity)
        sharedUsers = SharedUsers(this@MainActivity)
        absensiViewModel = ViewModelProvider(this@MainActivity).get(AbsensiViewModel::class.java)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.navigationView)
        val header = navView.getHeaderView(0)
        navController = findNavController(R.id.fragment)
        appBarConfiguration = AppBarConfiguration(navController.graph, drawerLayout)


        navView.menu.findItem(R.id.keluar).setOnMenuItemClickListener(object : MenuItem.OnMenuItemClickListener {
            override fun onMenuItemClick(item: MenuItem?): Boolean {
                logOut()
                return true
            }
        })

        header.findViewById<TextView>(R.id.nama_pegawai).text = sharedUsers.nama
        header.findViewById<TextView>(R.id.nomor_hp).text = "NIP : ${sharedUsers.nip}"

        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        socketIO.IO().on("scan-success", checkData)
    }

    private val checkData = Emitter.Listener {
        runOnUiThread(object : Runnable {
            override fun run() {
                if(sharedUsers.id_pegawai == it[0].toString()) {
                    absensiViewModel.absen(it[0].toString().toInt())
                }
            }
        })
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

    private fun logOut() {
        sharedUsers.apply {
            id_pegawai = ""
            nama = ""
            kelamin = ""
            pendidikan = ""
            jabatan = ""
            nip = ""
            no_hp = ""
            role = ""
            isLogin = false
        }
        finish()
        startActivity(Intent(this@MainActivity, Login::class.java))
    }

}