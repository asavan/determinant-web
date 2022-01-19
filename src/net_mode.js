"use strict";

import connectionFunc from "./connection.js";
import qrRender from "./qrcode.js";
import protocol from "./protocol.js";
import {removeElem} from "./helper.js";

export default function netMode(window, document, settings, gameFunction) {
    return new Promise((resolve, reject) => {
        const connection = connectionFunc(settings);
        const color = settings.color;
        const socketUrl = connection.getWebSocketUrl(settings.wh, window.location.hostname);
        let staticHost = settings.sh || window.location.href;
        connection.on('socket_open', () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const url = new URL(staticHost);
            url.search = urlParams;
            url.searchParams.delete('wh');
            url.searchParams.delete('sh');
            url.searchParams.set('color', connection.getOtherColor(color));
            url.searchParams.set('currentMode', 'net');
            console.log("enemy url", url.toString());
            const code = qrRender(url.toString(), document.querySelector(".qrcode"));
            connection.on('socket_close', () => {
                removeElem(code);
                const game = gameFunction(window, document, settings);
                connection.on('recv', (data) => {
                    console.log(data);
                    protocol.parser(data, 'move', (n) => {
                        console.log("Enemy try to move " + JSON.stringify(n));
                        game.aiMove(n);
                    });
                });
                game.on('playerMove', (n) => connection.sendMessage(protocol.toMove(n)));
                resolve(game);
            });
        });

        try {
            connection.connect(socketUrl, color);
        } catch (e) {
            console.log(e);
        }

        connection.on('open', () => {
            console.log("open");
        });
    });
}
