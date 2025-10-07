import settings from "../src/settings.js";
import {wsServer} from "netdeps";
wsServer(settings.wsPort);
