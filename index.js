!function(n){var e={};function U(Q){if(e[Q])return e[Q].exports;var t=e[Q]={i:Q,l:!1,exports:{}};return n[Q].call(t.exports,t,t.exports,U),t.l=!0,t.exports}U.m=n,U.c=e,U.d=function(n,e,Q){U.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:Q})},U.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},U.t=function(n,e){if(1&e&&(n=U(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var Q=Object.create(null);if(U.r(Q),Object.defineProperty(Q,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)U.d(Q,t,function(e){return n[e]}.bind(null,t));return Q},U.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return U.d(e,"a",e),e},U.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},U.p="",U(U.s=1)}([function(module,exports){eval('module.exports = require("electron");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiPzA0ZjMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n')},function(module,exports,__webpack_require__){"use strict";eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst electron_1 = __webpack_require__(0);\nlet window;\nfunction createWindow() {\n    window = new electron_1.BrowserWindow({ width: 800, height: 600, titleBarStyle: 'hiddenInset' });\n    window.show();\n    window.loadFile('index.html');\n    window.webContents.openDevTools();\n    window.on('closed', () => {\n        window = null;\n    });\n}\nelectron_1.app.on('ready', createWindow);\nelectron_1.app.on('window-all-closed', () => {\n    if (process.platform !== 'darwin') {\n        electron_1.app.quit();\n    }\n});\nelectron_1.app.on('activate', () => {\n    if (window === null) {\n        createWindow();\n    }\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC50cz9hOTU5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQTRDO0FBRzVDLElBQUksTUFBNEIsQ0FBQztBQUVqQyxTQUFTLFlBQVk7SUFDakIsTUFBTSxHQUFHLElBQUksd0JBQWEsQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztJQUNwRixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRSxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsY0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFOUIsY0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDN0IsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUMvQixjQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZDtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0lBQ3BCLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNqQixZQUFZLEVBQUUsQ0FBQztLQUNsQjtBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcCwgQnJvd3NlcldpbmRvd30gZnJvbSAnZWxlY3Ryb24nO1xuXG5cbmxldCB3aW5kb3c6IEJyb3dzZXJXaW5kb3cgfCBudWxsO1xuXG5mdW5jdGlvbiBjcmVhdGVXaW5kb3coKTogdm9pZCB7XG4gICAgd2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe3dpZHRoOiA4MDAsIGhlaWdodDogNjAwLCB0aXRsZUJhclN0eWxlOiAnaGlkZGVuSW5zZXQnfSk7XG4gICAgd2luZG93LnNob3coKTtcbiAgICB3aW5kb3cubG9hZEZpbGUoJ2luZGV4Lmh0bWwnKTtcbiAgICB3aW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG4gICAgd2luZG93Lm9uKCdjbG9zZWQnLCAoKT0+e1xuICAgICAgICB3aW5kb3cgPSBudWxsO1xuICAgIH0pO1xufVxuXG5hcHAub24oJ3JlYWR5JywgY3JlYXRlV2luZG93KTtcblxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbiAgICAgICAgYXBwLnF1aXQoKTtcbiAgICB9XG59KTtcblxuYXBwLm9uKCdhY3RpdmF0ZScsICgpID0+IHtcbiAgICBpZiAod2luZG93ID09PSBudWxsKSB7XG4gICAgICAgIGNyZWF0ZVdpbmRvdygpO1xuICAgIH1cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n")}]);