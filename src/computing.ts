import {DirectoryOperations} from "./utils";
import * as fs from 'fs';

namespace Computation {
    type processingCallback = (err: Error, filename: string) => void;

    interface ProcessingResponse {
        processingDir(callback: processingCallback): void;
    }

    interface FileParabolicObjectStructure {
        question: string;
        x: string;
        y: string;
        selection: string;
        type: string;
        number: string;
        original_index: string;
    }
    interface FileSliderObjectStructure {
        question: string;
        position: string;
        selection: string;
        type: string;
        number: string;
        original_index: string;
    }
    interface FileTimeStructure {
        [name: string]: number;
    }
    interface FileStructure {
        ID: string;
        GROUP: string;
        ANSWERS: [FileParabolicObjectStructure] | [FileSliderObjectStructure];
        TIME: FileTimeStructure;
    }

    interface processedObjTimeStructure {
        [name: string]: number;
    }
    interface processedObjStructure {
        id: string;
        group: string;
        score: number;
        time: processedObjTimeStructure;
    }

    class Processing implements ProcessingResponse{

        constructor(private dir_obj: DirectoryOperations, private file_type: string = 'json') {}

        private processingObject(obj: FileStructure): processedObjStructure {

        }

        private async processingFile(file_path: string): boolean {
            return new Promise((resolve, reject) => {
                fs.readFile(file_path, "utf8", (err, data) => {
                    if (err) throw err;
                    let json_obj;
                    try {
                        json_obj = JSON.parse(data);
                    } catch (e) {
                        reject(e);
                    }
                    // an assumption that json object compiles with specified interface FileStructure
                    resolve(this.processingObject(json_obj as FileStructure));
                });
            });
        }
        async processingDir(callback: processingCallback): void {
            const source_dir = this.dir_obj.getOpenDirectory();
            const dest_dir = this.dir_obj.getSaveDirectory();
            return new Promise((resolve, reject) => {
                fs.readdir(source_dir, (err, files) => {
                    if (err) throw err;
                    files.forEach(async (filename) => {
                        if (filename.endsWith(this.file_type)) {
                            const result = await this.processingFile(source_dir+'/'+filename);
                        }
                    });
                });
            });
        }
    }
}