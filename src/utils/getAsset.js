"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.getAsset = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function getAsset(assetFileName) {
    return path_1.default.resolve(process.cwd(), `./assets/${assetFileName}`);
}
exports.getAsset = getAsset;
function readFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let fileData = '';
            yield fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    resolve(fileData);
                }
                fileData = yield fs_1.default.promises.readFile(filePath, { encoding: 'utf8' });
                resolve(fileData);
            }));
        }));
    });
}
exports.readFile = readFile;
