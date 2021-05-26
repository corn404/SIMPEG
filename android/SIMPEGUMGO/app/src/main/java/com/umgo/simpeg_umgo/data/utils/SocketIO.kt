package com.umgo.simpeg_umgo.data.utils

import android.content.Context
import com.umgo.simpeg_umgo.data.service.API.Companion.URL_SOCKETS
import io.socket.client.Socket
import io.socket.client.IO

class SocketIO(private var context: Context) {

    private var socket: Socket

    init {
        socket = IO.socket(URL_SOCKETS)
        socket.connect()
    }


    fun IO() = socket

}