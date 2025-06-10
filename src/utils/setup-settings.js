import {parseSettings} from "./parse-settings.js";
import settingsOriginal from "../settings.js";

export function adjustMode(changed, settings, location) {
    if (settings.mode !== "auto") {
        return;
    }
    if (location.protocol === "https:" || location.protocol === "file:") {
        settings.mode = "ai";
    } else {
        settings.mode = "cheating";
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            settings.showMove = true;
        }
    }
    settings.modeGuessCount = 1;
}

export default function setupSettings(window) {
    const settings = {...settingsOriginal};
    const changed = parseSettings(window.location.search, settings);
    adjustMode(changed, settings, window.location);

    return settings;
}
