require('./style.scss');
import * as $ from "jquery";
import {DirectoryOperations} from "./utils";
import {Processing} from "./computing";


const handle_open_directory = (dir_obj: DirectoryOperations) => {
    const $open_directory = $('#open_directory');
    $open_directory.on('click', (event) => {
        const path = dir_obj.getOpenDirectory();
        const $this = $(event.currentTarget);
        $this.siblings('.message').html(`<strong>Open directory path: ${path}</strong>`);
    });
};

const handle_save_directory = (dir_obj: DirectoryOperations) => {
    const $save_directory = $('#save_directory button');
    $save_directory.on('click', (event) => {
        const path = dir_obj.getSaveDirectory();
        const $this = $(event.currentTarget);
        $this.siblings('.message').html(`<strong>Save directory path: ${path}</strong>`);
    });
};

const handle_open_answer_file = (dir_obj: DirectoryOperations) => {
    const $open_file = $('#open_answer_file button');
    $open_file.on('click', (event) => {
        const path = dir_obj.getAnswerFilePath();
        const $this = $(event.currentTarget);
        $this.siblings('.message').html(`<strong>Answer file path: ${path}</strong>`);
    });
};

const handle_submit = (dir_obj: DirectoryOperations) => {
    const $btn = $('#submit_task button');
    $btn.on('click', (event) => {
        const processing = new Processing(dir_obj, 'json');
        $('#submit_task .message').html('Processing files ...');
        processing.processingDir().then((dest_file_name) => {
            $('#submit_task .message').html(`Successfully generated ${dest_file_name} at ${dir_obj.getSaveDirectory()}`);
        });
    });
};


window.addEventListener('load', function () {
    const dir_obj = new DirectoryOperations();
    handle_open_directory(dir_obj);
    handle_save_directory(dir_obj);
    handle_open_answer_file(dir_obj);
    handle_submit(dir_obj);
});

