import {remote} from 'electron';


export class DirectoryOperations {
    constructor(private open_directory: string = '', private save_directory: string = '') {}
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
}