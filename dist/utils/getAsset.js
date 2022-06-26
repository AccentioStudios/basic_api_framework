import path from 'path';
import fs from 'fs';
export function getAsset(assetFileName) {
    return path.resolve(process.cwd(), `./assets/${assetFileName}`);
}
export async function readFile(filePath) {
    return new Promise(async (resolve, reject) => {
        let fileData = '';
        await fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                resolve(fileData);
            }
            fileData = await fs.promises.readFile(filePath, { encoding: 'utf8' });
            resolve(fileData);
        });
    });
}
