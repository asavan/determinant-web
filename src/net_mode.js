"use strict";

import connectionFunc from "./connection.js";
import qrRender from "./qrcode.js";
import protocol from "./protocol.js";
import actionsFunc from "./actions.js";
import {removeElem} from "./helper.js";

export default function netMode(window, document, settings, gameFunction) {
    return new Promise((resolve, reject) => {
        const connection = connectionFunc(settings);
        const color = settings.color;
        const staticHost = settings.sh || window.location.href;
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
            });
        });

        try {
            connection.connect(window.location.hostname);
        } catch (e) {
            console.log(e);
            reject(e);
        }

        connection.on('open', () => {
            console.log("open");
            const game = gameFunction(window, document, settings);
            const actions = actionsFunc(game);
            connection.on('recv', (data) => {
                console.log(data);
                for (const [handlerName, callback] of Object.entries(actions)) {
                  protocol.parser(data, handlerName, callback);
                }
            });
            for (const [handlerName, callback] of Object.entries(actions)) {
                game.on(handlerName, (n) => connection.sendMessage(protocol.toObjJson(n, handlerName)));
            }
            resolve(game);
        });
    });
}
