require('./style.scss');
import * as $ from "jquery";
import {DirectoryOperations} from "./utils";

const handle_open_directory = (dir_obj: DirectoryOperations) => {
    const $open_directory = $('#open_directory');
    $open_directory.on('click', (event) => {
        const path = dir_obj.getOpenDirectory();
        const $this = $(event.currentTarget);
        $this.siblings('.message').html(`<strong>Open directory path: ${path}</strong>`);
    });
};

const handle_save_directory = (dir_obj: DirectoryOperations) => {
    const $save_directory = $('#save_directory');
    $save_directory.on('click', (event) => {
        const path = dir_obj.getSaveDirectory();
        const $this = $(event.currentTarget);
        $this.siblings('.message').html(`<strong>Save directory path: ${path}</strong>`);
    });
};


window.addEventListener('load', function () {
    const dir_obj = new DirectoryOperations();
    handle_open_directory(dir_obj);
    handle_save_directory(dir_obj);

});

