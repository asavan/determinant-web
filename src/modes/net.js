import connectionFunc from "../connection/connection.js";
import { getSocketUrl, getStaticUrl } from "../connection/common.js";
import protocol from "../connection/protocol.js";
import actionsFunc from "../actions.js";
import { makeQrPlainEl, removeElem } from "../views/qr_helper.js";

export default function netMode(window, document, settings, gameFunction) {
    return new Promise((resolve, reject) => {
        const socketUrl = getSocketUrl(window.location, settings);
        if (!socketUrl) {
            reject("No ws");
            return;
        }
        const connection = connectionFunc(settings);
        const color = settings.color;
        const staticHost = getStaticUrl(window.location, settings);
        let qrElem = null;
        let connectedToWebsocket = false;
        connection.on("socket_open", () => {
            connectedToWebsocket = true;
            const url = new URL(staticHost);
            if (color === "blue") {
                url.searchParams.set("color", "red");
            }
            url.searchParams.set("mode", "net");
            qrElem = makeQrPlainEl(url.toString(), document.querySelector(".qrcode"), "./images/sigma.svg");
        });

        connection.on("socket_close", (reason) => {
            if (!connectedToWebsocket) {
                reject(reason);
                return;
            }
            removeElem(qrElem);
        });

        connection.on("open", () => {
            console.log("open");
            const game = gameFunction(window, document, settings);
            const actions = actionsFunc(game);
            connection.on("recv", (data) => {
                console.log(data);
                for (const [handlerName, callback] of Object.entries(actions)) {
                    protocol.parser(data, handlerName, callback);
                }
            });
            for (const [handlerName, ] of Object.entries(actions)) {
                game.on(handlerName, (n) => connection.sendMessage(protocol.toObjJson(n, handlerName)));
            }
            resolve(game);
        });

        try {
            connection.connect(socketUrl);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
