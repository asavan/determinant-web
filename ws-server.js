import { WebSocketServer } from "ws";
import settings from "./src/settings.js";
const wss = new WebSocketServer({port: settings.wsPort});
const wsList = [];

wss.on('connection', function (ws) {
    console.log('WS connection established!')
    wsList.push(ws);

    ws.on('close', function () {
        wsList.splice(wsList.indexOf(ws), 1);
        console.log('WS closed!')
    });

    ws.on('message', function (message) {
        console.log('Got ws message: ' + message);
        for (let i = 0; i < wsList.length; i++) {
            // send to everybody on the site
            wsList[i].send(message);
        }
    });
});
