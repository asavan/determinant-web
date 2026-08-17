import connectionFunc from "../connection/connection.js";

import {
    makeQrElement,
    removeElem,
    netObj
} from "netutils";

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
    const image = {
        source: "./images/sigma.svg",
        width: "15%",
        height: "15%",
        x: "center",
        y: "center",
    };
    const element = document.createElement("div");
    element.classList.add("qrcode");
    qrcontainer.appendChild(element);
    url.searchParams.set("color", color);
    url.searchParams.set("mode", "net");
    makeQrElement(url.toString(), element, image);
    colorizePath(element, color);
    code[color] = element;
}

export default function server(window, document, settings) {
    const socketUrl = netObj.getWebSocketUrl(settings, window.location);
    if (!socketUrl) {
        console.error("No ws");
        return;
    }
    const connection = connectionFunc(settings);
    const staticHost = netObj.getHostUrl(settings, window.location);
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
