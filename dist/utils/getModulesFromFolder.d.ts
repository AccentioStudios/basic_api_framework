import { FileGettedFromFolder } from '../classes';
/**
  * Read all modules files in the same directory
  * @param {string} dir      directory to search
  * @param {string} ext      Extension of the file to list
  * @param {string[]} ignore   List of files to ignore
  */
export declare function getModulesFromFolder(dir: string, ext: string, ignore: string[]): Promise<FileGettedFromFolder[]>;
