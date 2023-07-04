"use strict";
const colors = ['blue', 'red'];

function stub(message) {
    console.log("Stub " + message);
}

let user = "";
let user2 = "";

const handlers = {
    'recv': stub,
    'open': stub,
    'socket_open': stub,
    'socket_close': stub,
    'close': stub,
}


function sendNegotiation(type, sdp, ws) {
    const json = {from: user, to: user2, action: type, data: sdp};
    console.log("Sending [" + user + "] to [" + user2 + "]: " + JSON.stringify(sdp));
    return ws.send(JSON.stringify(json));
}

function getOtherColor(color) {
    for (const colorOther of colors) {
        if (color === colorOther) {
            continue;
        }
        return colorOther;
    }
    return "";
}


function createSignalingChannel(socketUrl, color, serverOnly) {
    const ws = new WebSocket(socketUrl);

    const send = (type, sdp) => {
        return sendNegotiation(type, sdp, ws);
    }
    const close = () => {
        ws.close();
    }


    const onmessage = stub;
    const result = {onmessage, send, close};

    ws.onopen = function (e) {
        console.log("Websocket opened");
        handlers['socket_open']();
        if (!serverOnly) {
            user = color;
            user2 = getOtherColor(color);
            sendNegotiation("connected", {color: user}, ws);
        }
    }
    ws.onclose = function (e) {
        console.log("Websocket closed");
        handlers['socket_close']();
    }

    ws.onmessage = function (e) {
        if (e.data instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
                result.onmessage(reader.result);
            };
            reader.readAsText(e.data);
        } else {
            result.onmessage(e.data);
        }
    }
    ws.onerror = function (e) {
        console.log("Websocket error");
    }
    return result;
}

const connectionFunc = function (settings) {

    const serverOnly = settings.currentMode === 'server';
    // let ws = null;


    function on(name, f) {
        handlers[name] = f;
    }


    function getWebSocketUrl(socketUrl, host) {
        if (socketUrl) {
            return socketUrl;
        }
        if (window.location.protocol === 'https:') {
            return null;
        }
        return "ws://" + host + ":" + settings.wsPort
    }

// inspired by http://udn.realityripple.com/docs/Web/API/WebRTC_API/Perfect_negotiation#Implementing_perfect_negotiation
// and https://w3c.github.io/webrtc-pc/#perfect-negotiation-example
    function connect(host) {
        const socketUrl = getWebSocketUrl(settings.wh, host);
        const color = settings.color;
        const signaling = createSignalingChannel(socketUrl, color, serverOnly);
        const peerConnection = new RTCPeerConnection();
        window.pc = peerConnection;

        peerConnection.onicecandidate = function (e) {
            if (!e) return;
            console.log("candidate", e.candidate);
            signaling.send("candidate", e.candidate);
        }
        peerConnection.oniceconnectionstatechange = () => {
          if (peerConnection.iceConnectionState === "failed") {
            console.error("failed");
            peerConnection.restartIce();
          }
        };
        let makingOffer = false;
        const polite = color === 'red';

        let ignoreOffer = false;
        let isSettingRemoteAnswerPending = false;

        peerConnection.onnegotiationneeded = async () => {
          try {
            makingOffer = true;
            console.log("make offer");
            await peerConnection.setLocalDescription();
            signaling.send("description", peerConnection.localDescription);
          } catch(err) {
            console.error(err);
          } finally {
            makingOffer = false;
          }
        }

        peerConnection.ondatachannel = (ev) => {
          if (dataChannel == null || polite) {
              console.log("new channel recieved");
              setupDataChannel(ev.channel, signaling);
          }
        };

        signaling.onmessage = async function(text) {
            console.log("Websocket message received: " + text);
            const json = JSON.parse(text);
            if (json.from === user) {
                console.error("same user");
                return;
            }

            if (serverOnly) {
                handlers['server_message'](json);
                return;
            }

            if (json.action === "candidate") {
                processIce(json.data, peerConnection);
            } else if (json.action === "description") {
                const description = json.data;
                const readyForOffer =
                !makingOffer &&
                (pc.signalingState == "stable" || isSettingRemoteAnswerPending);
                const offerCollision = description.type == "offer" && !readyForOffer;
                ignoreOffer = !polite && offerCollision;
                if (ignoreOffer) {
                  console.error("ignore");
                  return;
                }
                isSettingRemoteAnswerPending = description.type == "answer";
                await peerConnection.setRemoteDescription(description);
                isSettingRemoteAnswerPending = false;
                if (description.type =="offer") {
                    await peerConnection.setLocalDescription();
                    signaling.send("description", peerConnection.localDescription);
                }
            } else if (json.action === "connected") {
                openDataChannel(peerConnection, signaling);
            } else if (json.action === "close") {
                // need for server
            } else {
                console.log("Unknown type " + json.action);
            }
        }
    }

    let dataChannel = null;
    let isConnected = false;

    function setupDataChannel(c, signaling) {
        dataChannel = c;
        dataChannel.onmessage = function (e) {
            handlers['recv'](e.data);
        };

        dataChannel.onopen = function () {
            console.log("------ DATACHANNEL OPENED ------");
            isConnected = true;
            signaling.send("close", {});
            signaling.close();
            handlers['open']();
        };

        dataChannel.onclose = function () {
            console.log("------ DC closed! ------");
            isConnected = false;
        };

        dataChannel.onerror = function () {
            console.log("DC ERROR!!!")
        };
    }

    function sendMessage(messageBody) {
        if (!dataChannel) {
            return false;
        }
        if (!isConnected) {
            console.log("Not connected");
            return false;
        }
        dataChannel.send(messageBody);
        return isConnected;
    }

    function openDataChannel(pc, s) {
        console.log("ch created");
        setupDataChannel(pc.createDataChannel("gamechannel"), s);
    }

    function processIce(iceCandidate, peerConnection) {
        console.log("------ PROCESSED ISE ------", iceCandidate);
        return peerConnection.addIceCandidate(iceCandidate).catch(e => {
            console.error(e)
        });
    }

    return {connect, sendMessage, on, getOtherColor};
};

export default connectionFunc;
