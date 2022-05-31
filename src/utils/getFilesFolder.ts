import fs = require('fs');
import path = require('path');
import { FileGettedFromFolder } from '../classes';

/**
  * Read all files in the same directory
  * @param {string} dir      directory to search
  * @param {string} ext      Extension of the file to list
  * @param {string[]} ignore   List of files to ignore
  */

export async function getFilesFolder(dir: string, ext: string, ignore: string[]): Promise<FileGettedFromFolder[]> {
    let objects: FileGettedFromFolder[] = [];


    const files = (await fs.promises.readdir(dir, { withFileTypes: true }))
        .filter(dirent => dirent.isFile()).map(dirent => dirent.name);

    await files.forEach(async (file) => {
        await ignore.forEach((ignoreItem) => {
            if (file.includes(ignoreItem)) { return; }
        });
        if (path.extname(file) === `.${ext}`) {
            var _module = await import(path.join(dir, file));
            let object = new FileGettedFromFolder(path.parse(file).name, _module);
            objects.push(object);
        }
    });

    return objects;
};