import {install} from "netutils";
import starter from "./starter.js";

starter(window, document);


if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
        install(window, document);
    }
}
