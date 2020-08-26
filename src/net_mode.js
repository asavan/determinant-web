"use strict";

import connectionFunc from "./connection.js";
import qrRender from "./qrcode.js";
import protocol from "./protocol.js";
import {removeElem} from "./helper.js";

export default function netMode(window, document, settings, urlParams, game) {
    const connection = connectionFunc(settings);
    const color = urlParams.get('color') || 'blue';
    const host = window.location.hostname;
    const socketUrl = connection.getWebSocketUrl(urlParams.get('wh'), host);
    let staticHost = urlParams.get('sh') || window.location.href;
    let code = null;
    connection.on('socket_open', () => {
        const url = new URL(staticHost);
        url.search = urlParams;
        url.searchParams.delete('wh');
        url.searchParams.delete('sh');
        url.searchParams.set('color', connection.getOtherColor(color));
        code = qrRender(url.toString(), document.querySelector(".qrcode"));
    });

    connection.on('socket_close', () => {
        removeElem(code);
    });

    try {
        connection.connect(socketUrl, color);
    } catch (e) {
        console.log(e);
    }

    connection.on('open', () => {
        console.log("open");
    });

    connection.on('recv', (data) => {
        console.log(data);
        protocol.parser(data, 'move', (n) => {
            console.log("Enemy try to move " + n);
            game.aiMove(n);
        });
    });
    game.on('playerMove', (n) => connection.sendMessage(protocol.toMove(n)));
}
