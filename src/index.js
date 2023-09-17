"use strict";

import install from "./install_as_app.js";
import {launch, starter} from "./starter.js";

launch(starter, window, document);

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
        install(window, document);
    }
}
