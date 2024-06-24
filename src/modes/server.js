"use strict";

import connectionFunc from "../connection/connection.js";
import { getSocketUrl, getStaticUrl } from "../connection/common.js";
import { makeQrPlainEl, removeElem } from "../views/qr_helper.js";

const SERVER_COLOR = "black";

function colorizePath(elem, color) {
    if (!elem) {
        return;
    }
    const svgPaths = elem.querySelectorAll("rect[fill='#000']");
    for (const svgPath of svgPaths) {
        svgPath.style.fill = color;
    }
}

function oneQrCode(url, code, color, qrcontainer, document) {
    const element = document.createElement("div");
    element.classList.add("qrcode");
    qrcontainer.appendChild(element);
    url.searchParams.set("color", color);
    makeQrPlainEl(url.toString(), element, "./images/sigma.svg");
    colorizePath(element, color);
    code[color] = element;
}

export default function server(window, document, settings) {
    const socketUrl = getSocketUrl(window.location, settings);
    if (!socketUrl) {
        console.error("No ws");
        return;
    }
    const connection = connectionFunc(settings);
    const staticHost = getStaticUrl(window.location, settings);
    const code = {};
    {
        const url = new URL(staticHost);
        const qrcontainer = document.querySelector(".qrcontainerserver");
        oneQrCode(url, code, "blue", qrcontainer, document);
        oneQrCode(url, code, "red", qrcontainer, document);
    }

    connection.on("socket_open", () => {
        colorizePath(code["blue"], "royalblue");
    });

    connection.on("server_message", (json) => {
        if (json.action === "connected") {
            colorizePath(code[json.from], SERVER_COLOR);
        } else if (json.action === "close") {
            removeElem(code[json.from]);
        }
    });

    try {
        connection.connect(socketUrl);
    } catch (e) {
        console.log(e);
    }
}
