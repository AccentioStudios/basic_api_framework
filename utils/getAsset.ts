import path = require('path');

export function getAsset(assetFileName: string) {
    return path.resolve(process.cwd(), `./assets/${assetFileName}`);
}