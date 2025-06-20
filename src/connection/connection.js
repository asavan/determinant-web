function stub(message) {
    console.log("Stub " + message);
}

let user = "";

const handlers = {
    "recv": stub,
    "open": stub,
    "socket_open": stub,
    "socket_close": stub,
    "timeout": stub,
    "close": stub,
};

function createSignalingChannel(socketUrl, color, serverOnly) {
    const ws = new WebSocket(socketUrl);

    const send = (type, sdp, to, ignore) => {
        const toSend = to || "all";
        const json = {from: color, to: toSend, action: type, data: sdp, ignore};
        console.log("Sending [" + color + "] to [" + toSend + "]: " + JSON.stringify(sdp));
        return ws.send(JSON.stringify(json));
    };
    const close = () => {
        ws.close();
    };

    const onmessage = stub;
    const result = {onmessage, send, close};

    ws.onopen = function (e) {
        console.log("Websocket opened", e);
        handlers["socket_open"]();
        user = color;
        if (!serverOnly) {
            send("connected", {color: color});
        }
    };
    ws.onclose = function (e) {
        console.log("Websocket closed", e);
        handlers["socket_close"](e);
    };

    ws.onmessage = async function (e) {
        if (e.data instanceof Blob) {
            const text = await e.data.text();
            return result.onmessage(text);
        } else {
            return result.onmessage(e.data);
        }
    };

    ws.onerror = function (e) {
        console.log("Websocket error", e);
    };
    return result;
}

const connectionFunc = function (settings) {
    const signal = AbortSignal.timeout(settings.connectionTimeout);

    const serverOnly = settings.mode === "server";
    // let ws = null;


    function on(name, f) {
        handlers[name] = f;
    }
    const abortExecutor = (e) => {
        handlers["timeout"](e);
    };
    signal.addEventListener("abort", abortExecutor);
    let signaling = null;

    // inspired by
    // http://udn.realityripple.com/docs/Web/API/WebRTC_API/Perfect_negotiation#Implementing_perfect_negotiation
    // and https://w3c.github.io/webrtc-pc/#perfect-negotiation-example
    function connect(socketUrl) {
        const color = settings.color;
        signaling = createSignalingChannel(socketUrl, color, serverOnly);
        const peerConnection = new RTCPeerConnection();

        peerConnection.onicecandidate = function (e) {
            if (!e) {
                return;
            }
            console.log("candidate", e.candidate);
            signaling.send("candidate", e.candidate);
        };
        peerConnection.oniceconnectionstatechange = () => {
            if (peerConnection.iceConnectionState === "failed") {
                console.error("failed");
                peerConnection.restartIce();
            }
        };
        let makingOffer = false;
        const polite = color === "red";

        let ignoreOffer = false;
        let isSettingRemoteAnswerPending = false;

        peerConnection.onnegotiationneeded = async () => {
            try {
                makingOffer = true;
                console.log("make offer");
                await peerConnection.setLocalDescription();
                signaling.send("description", peerConnection.localDescription);
            } catch (err) {
                console.error(err);
            } finally {
                makingOffer = false;
            }
        };

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
                handlers["server_message"](json);
                return;
            }

            if (json.action === "candidate") {
                processIce(json.data, peerConnection);
            } else if (json.action === "description") {
                const description = json.data;
                const readyForOffer =
                !makingOffer &&
                (peerConnection.signalingState === "stable" || isSettingRemoteAnswerPending);
                const offerCollision = description.type === "offer" && !readyForOffer;
                ignoreOffer = !polite && offerCollision;
                if (ignoreOffer) {
                    console.error("ignore");
                    return;
                }
                isSettingRemoteAnswerPending = description.type === "answer";
                await peerConnection.setRemoteDescription(description);
                isSettingRemoteAnswerPending = false;
                if (description.type === "offer") {
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
        };
    }

    let dataChannel = null;
    let isConnected = false;

    function setupDataChannel(c, signaling) {
        dataChannel = c;
        dataChannel.onmessage = function (e) {
            handlers["recv"](e.data);
        };

        dataChannel.onopen = function () {
            console.log("------ DATACHANNEL OPENED ------");
            isConnected = true;
            signal.removeEventListener("abort", abortExecutor);
            signaling.send("close", {});
            signaling.close();
            handlers["open"]();
        };

        dataChannel.onclose = function () {
            console.log("------ DC closed! ------");
            isConnected = false;
        };

        dataChannel.onerror = function () {
            console.log("DC ERROR!!!");
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
            console.error(e);
        });
    }

    const closeAll = () => {
        dataChannel?.close();
        signaling?.close();
    };

    return {connect, sendMessage, on, closeAll};
};

export default connectionFunc;
