import fs from 'fs';
import path from 'path';
import { FileGettedFromFolder } from '../classes';
import { readFile } from './getAsset';
import { glob, IOptions } from 'glob';


/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {IOptions} options Options of glob package
  */
export async function getModulesGlob(dir: string, options: IOptions): Promise<FileGettedFromFolder[]> {
    return new Promise((resolve, reject) => {
        glob(dir, options, async (err: any, files: any) => {
            let objects: FileGettedFromFolder[] = [];
            for await (const pathFile of files) {
                const content = await readFile(pathFile);
                const _module = await import(pathFile);
                const object = new FileGettedFromFolder(path.parse(pathFile).name, content, _module, pathFile);
                objects.push(object);
            }
            resolve(objects);
        });
    });
}

/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {string} ext      Extension of the file to list
  * @param {string[]} ignore   List of files to ignore
  */

export async function getModulesFromFolder(dir: string, ext: string, ignore: string[]): Promise<FileGettedFromFolder[]> {
    let objects: FileGettedFromFolder[] = [];

    const files = (await fs.promises.readdir(dir, { withFileTypes: true }))
        .filter((dirent: { isFile: () => any; }) => dirent.isFile()).map((dirent: { name: any; }) => dirent.name);

    const filterFiles = files.filter(function (value: any, index: number, arr: any[]) {
        if (!ignore.map(function (ignoreValue) {
            return `${ignoreValue}.${ext}`;
        }).includes(value)) {
            return value;
        }
    });

    for await (const file of filterFiles) {
        if (path.extname(file) === `.${ext}`) {
            const pathFile = path.join(dir, file);
            const content = await readFile(pathFile);
            const _module = await import(pathFile);
            const object = new FileGettedFromFolder(path.parse(file).name, content, _module, pathFile);
            objects.push(object);
        }
    }

    return objects;
};

