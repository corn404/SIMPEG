package com.umgo.simpeg_umgo.ui.splashscreen

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import com.umgo.simpeg_umgo.MainActivity
import com.umgo.simpeg_umgo.R
import com.umgo.simpeg_umgo.data.utils.SharedUsers
import com.umgo.simpeg_umgo.ui.login.Login

class SplashScreen : AppCompatActivity() {
    private lateinit var i: Intent
    private lateinit var sharedUsers: SharedUsers
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)
        actionBar?.hide()
        supportActionBar?.hide()
        sharedUsers = SharedUsers(this@SplashScreen)

        if(sharedUsers.isLogin) {
            i = Intent(this@SplashScreen, MainActivity::class.java)
        } else {
            i = Intent(this@SplashScreen, Login::class.java)
        }

        Handler(Looper.getMainLooper()).postDelayed({
            finish()
            startActivity(i)
        }, 4000)

    }


}