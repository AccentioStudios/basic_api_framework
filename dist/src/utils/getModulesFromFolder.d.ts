import { FileGettedFromFolder } from '../classes';
import G = require('glob');
/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {G.IOptions} options Options of glob package
  */
export declare function getModulesGlob(dir: string, options: G.IOptions): Promise<FileGettedFromFolder[]>;
/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {string} ext      Extension of the file to list
  * @param {string[]} ignore   List of files to ignore
  */
export declare function getModulesFromFolder(dir: string, ext: string, ignore: string[]): Promise<FileGettedFromFolder[]>;
