import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const dotenv = __require("dotenv");
dotenv.config();
require('./src/core/boot');
