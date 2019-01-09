import {remote} from 'electron';

interface DirOps {
    getOpenDirectory(): string,
    getSaveDirectory(): string,
    getAnswerFilePath(): string
}

export class DirectoryOperations implements DirOps{
    constructor(private open_directory: string = '', private save_directory: string = '', private answer_file: string = '') {}
    getOpenDirectory(): string {
        if (this.open_directory === '') {
            this.open_directory = remote.dialog.showOpenDialog({properties: ['openDirectory'], message: 'Choose the directory that contains JSON files from user'})[0];
        }
        return this.open_directory;
    }
    getSaveDirectory(): string {
        if (this.save_directory === '') {
            this.save_directory = remote.dialog.showSaveDialog({message: 'Choose the directory to save output files'});
        }
        return this.save_directory;
    }
    getAnswerFilePath(): string {
        if (this.answer_file === '') {
            this.answer_file = remote.dialog.showOpenDialog({properties: ['openFile'], message: 'Choose the answer file directory'})[0];
        }
        return this.answer_file;
    }
}

export const hasOwnProperty = (obj: object, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);