import commonCopy from "./common_import.js";
import { webpackDev } from "devdeps";
import settings from "../src/settings.js";

const devConfig = () => webpackDev(commonCopy, settings);

export default devConfig;
