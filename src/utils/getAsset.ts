import path = require('path');
import fs = require('fs');

export function getAsset(assetFileName: string) {
    return path.resolve(process.cwd(), `./assets/${assetFileName}`);
}


export async function readFile(filePath: string): Promise<string> {
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
