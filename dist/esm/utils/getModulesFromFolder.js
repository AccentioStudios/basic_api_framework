var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import fs from 'fs';
import path from 'path';
import { FileGettedFromFolder } from '../classes';
import { readFile } from './getAsset';
import { glob } from 'glob';
/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {IOptions} options Options of glob package
  */
export function getModulesGlob(dir, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            glob(dir, options, (err, files) => { var files_1, files_1_1; return __awaiter(this, void 0, void 0, function* () {
                var e_1, _a;
                let objects = [];
                try {
                    for (files_1 = __asyncValues(files); files_1_1 = yield files_1.next(), !files_1_1.done;) {
                        const pathFile = files_1_1.value;
                        const content = yield readFile(pathFile);
                        const _module = yield import(pathFile);
                        const object = new FileGettedFromFolder(path.parse(pathFile).name, content, _module, pathFile);
                        objects.push(object);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (files_1_1 && !files_1_1.done && (_a = files_1.return)) yield _a.call(files_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                resolve(objects);
            }); });
        });
    });
}
/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {string} ext      Extension of the file to list
  * @param {string[]} ignore   List of files to ignore
  */
export function getModulesFromFolder(dir, ext, ignore) {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function* () {
        let objects = [];
        const files = (yield fs.promises.readdir(dir, { withFileTypes: true }))
            .filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);
        const filterFiles = files.filter(function (value, index, arr) {
            if (!ignore.map(function (ignoreValue) {
                return `${ignoreValue}.${ext}`;
            }).includes(value)) {
                return value;
            }
        });
        try {
            for (var filterFiles_1 = __asyncValues(filterFiles), filterFiles_1_1; filterFiles_1_1 = yield filterFiles_1.next(), !filterFiles_1_1.done;) {
                const file = filterFiles_1_1.value;
                if (path.extname(file) === `.${ext}`) {
                    const pathFile = path.join(dir, file);
                    const content = yield readFile(pathFile);
                    const _module = yield import(pathFile);
                    const object = new FileGettedFromFolder(path.parse(file).name, content, _module, pathFile);
                    objects.push(object);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (filterFiles_1_1 && !filterFiles_1_1.done && (_a = filterFiles_1.return)) yield _a.call(filterFiles_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return objects;
    });
}
;
