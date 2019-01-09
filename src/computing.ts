import {DirectoryOperations} from "./utils";
import * as fs from 'fs';

const PARABOLIC_KEYWORD = 'parabolic';
const LINEAR_KEYWORD = 'linear';

interface UserFileBaseObjectStructure {
    question: string;
    selection: string;
    type: string;
    number: number;
    original_index: number;
}
interface UserFileParabolicObjectStructure extends UserFileBaseObjectStructure{
    x: string;
    y: string;
}
interface UserFileSliderObjectStructure extends UserFileBaseObjectStructure {
    position: string;
}
interface UserFileStructure {
    ID: string;
    GROUP: string;
    ANSWERS: [UserFileParabolicObjectStructure] | [UserFileSliderObjectStructure];
    TIME: {[name: string]: number};
}


interface processedObjStructure {
    id: string;
    group: string;
    score: {score: number, index: number}[];
    time: {task: string, time: number}[];
}

interface AnswerFileObjectStructure {
    index: number;
    answer: string;
    type: string;
}

type processingCallback = (err: Error, filename: string) => void;

interface ProcessingResponse {
    processingDir(callback: processingCallback): void;
}

export class Processing implements ProcessingResponse{

    constructor(private dir_obj: DirectoryOperations, private file_type: string = 'json') {}

    private async loadAnswerFile(file_path: string): Promise<AnswerFileObjectStructure[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(file_path, 'utf-8', (err, data) => {
                if (err) throw err;
                let json_obj;
                try {
                    json_obj = JSON.parse(data);
                } catch (e) {
                    reject(e);
                }
                resolve(json_obj as AnswerFileObjectStructure[]);
            });
        });
    }

    private processingObject(raw_obj: UserFileStructure, answer_obj: AnswerFileObjectStructure[]): processedObjStructure {
        const isMatch = (response: string, standard: string): boolean => {
            const processing = (str: string): string => str.trim().toLowerCase();
            return processing(response) === processing(standard);
        };
        const result = {} as processedObjStructure;
        result.id = raw_obj.ID;
        result.group = raw_obj.GROUP;
        result.score = [];
        // calculate score
        let slider_values: {num: number, index: number}[];
        if (result.group === PARABOLIC_KEYWORD) {
            const answers = raw_obj.ANSWERS as UserFileParabolicObjectStructure[];
            slider_values = answers.map((item) => {
                const num = (parseFloat(item.x)-50)/260+0.5;
                return {
                    num: isMatch(item.selection, 'Yes') ? num : 1-num,
                    index: item.original_index
                };
            });
        } else if (result.group === LINEAR_KEYWORD) {
            const answers = raw_obj.ANSWERS as UserFileSliderObjectStructure[];
            slider_values = answers.map((item) => {
                const num = parseInt(item.position)/100;
                return {
                    num: isMatch(item.selection, 'Yes') ? num : 1-num,
                    index: item.original_index
                };
            });
        } else {
            throw new Error('Invalid Group option');
        }
        for (let item of slider_values) {
            const answer = Processing.findAnswer(answer_obj, item.index, result.group);
            result.score.push({
                score: Processing.calculateBrier(item.num, isMatch(answer, 'Yes')),
                index: item.index
            });
        }
        // calculate time
        const all_keys = Object.keys(raw_obj.TIME);
        const start_key_set = new Set();
        const end_key_set = new Set();
        const start_id = '_start_time';
        const end_id = '_end_time';
        for (let key of all_keys) {
            if (key.endsWith(start_id)) {
                start_key_set.add(key.replace(start_id, ''));
            } else if (key.endsWith(end_id)) {
                end_key_set.add(key.replace(end_id, ''));
            }
        }
        result.time = [];
        for (let key of start_key_set) {
            if (end_key_set.has(key)) {
                result.time.push({
                    task: key,
                    // time is in term of milliseconds
                    time: raw_obj.TIME[key+end_id] - raw_obj.TIME[key+start_id]
                });
            }
        }
        return result;
    }

    private static calculateBrier(percentage: number, is_yes: boolean): number {
        // interpret user predictions as percentage to the Yes option
        const base = is_yes ? 1 : 0;
        return Math.pow((percentage-base), 2);
    }

    private static findAnswer(answer_obj: AnswerFileObjectStructure[], index: number, type: string): string {
        for (let item of answer_obj) {
            if (item.index === index && item.type === type) {
                return item.answer;
            }
        }
        return '';
    }

    private static async getAllFiles(dir_path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(dir_path, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }

    private async processingFile(file_path: string, answer_obj: AnswerFileObjectStructure[]): Promise<processedObjStructure> {
        return new Promise((resolve, reject) => {
            fs.readFile(file_path, "utf8", (err, data) => {
                if (err) throw err;
                let json_obj;
                try {
                    json_obj = JSON.parse(data);
                } catch (e) {
                    reject(e);
                }
                // an assumption that json object compiles with specified interface UserFileStructure
                resolve(this.processingObject(json_obj as UserFileStructure, answer_obj));
            });
        });
    }
    async processingDir(callback?: processingCallback): Promise<null> {
        const source_dir = this.dir_obj.getOpenDirectory();
        const dest_dir = this.dir_obj.getSaveDirectory();
        const answer_file_path = this.dir_obj.getAnswerFilePath();

        const answer_obj = await this.loadAnswerFile(answer_file_path);
        let result_arr: processedObjStructure[];
        try {
            const files_arr = await Processing.getAllFiles(source_dir);
            result_arr = await Promise.all(
                files_arr
                    .filter((filename: string) => filename.endsWith(this.file_type))
                    .map(async (filename: string) => this.processingFile(source_dir+'/'+filename, answer_obj))
            );
        } catch (e) {
            throw e;
        }
        return new Promise((resolve, reject) => {
            fs.writeFile(dest_dir, JSON.stringify(result_arr), (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}