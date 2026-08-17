import connectionFunc from "../connection/connection.js";
import actionsFunc from "../actions.js";

import {
    makeQrElement,
    removeElem,
    wrapNetworkToNegotiator,
    wrapActionsToNegotiator,
    netObj
} from "netutils";

export default function netMode(window, document, settings, gameFunction) {
    return new Promise((resolve, reject) => {
        const socketUrl = netObj.getWebSocketUrl(settings, window.location);
        if (!socketUrl) {
            reject("No ws");
            return;
        }
        const connection = connectionFunc(settings);
        const color = settings.color;
        const staticHost = netObj.getHostUrl(settings, window.location);
        let qrElem = null;
        let connectedToWebsocket = false;
        connection.on("socket_open", () => {
            connectedToWebsocket = true;
            const image = {
                source: "./images/sigma.svg",
                width: "15%",
                height: "15%",
                x: "center",
                y: "center",
            };
            const url = new URL(staticHost);
            if (color === "blue") {
                url.searchParams.set("color", "red");
            }
            qrElem = makeQrElement(url.toString(), document.querySelector(".qrcode"), image);
        });

        connection.on("socket_close", (reason) => {
            if (!connectedToWebsocket) {
                reject(reason);
                return;
            }
            removeElem(qrElem);
        });

        connection.on("timeout", (e) => {
            connection.closeAll();
            console.log("Connection timeout.", e);
            reject(e);
        });

        connection.on("open", () => {
            console.log("open");
            const game = gameFunction(window, document, settings);
            const actions = actionsFunc(game);

            const neg1 = wrapNetworkToNegotiator(connection);
            const gameNeg = wrapActionsToNegotiator(actions, "game", game);
            neg1.registerHandler(gameNeg);
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
