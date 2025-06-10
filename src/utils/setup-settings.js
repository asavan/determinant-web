import {parseSettings} from "./parse-settings.js";
import settingsOriginal from "../settings.js";

export function adjustMode(changed, settings, location) {
    if (settings.mode !== "auto") {
        return;
    }
    if (location.protocol === "https:") {
        settings.mode = "ai";
    } else {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            settings.mode = "cheating";
        } else {
            settings.mode = "net";
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
