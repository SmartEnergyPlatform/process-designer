/*
 *    Copyright 2018 InfAI (CC SES)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

'use strict';


module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var path = require('path');

    console.log("DEBUG", resolvePath('diagram-js', 'assets/diagram-js.css'))

    /**
     * Resolve external project resource as file path
     */
    function resolvePath(project, file) {
        return path.join(path.dirname(require.resolve(project)), file);
    }

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
            prod: {
                mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
                entry: "./app/app.js", // string | object | array  // defaults to './src'
                // Here the application starts executing
                // and webpack starts bundling
                output: {
                    // options related to how webpack emits results
                    path: path.resolve(__dirname, "dist"), // string
                    // the target directory for all output files
                    // must be an absolute path (use the Node.js path module)
                    filename: "index.js", // string    // the filename template for entry chunks
                    //publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
                    library: "SeplModeler", // string,
                    // the name of the exported library
                    libraryTarget: "window", // universal module definition    // the type of the exported library
                    /* Advanced output configuration (click to show) */
                },
                resolve: {
                    modules: [
                        "node_modules",
                    ],
                    extensions: [".js", ".jsx", ".json"],
                },
            }
        },
        copy: {
            diagram_js: {
                files: [
                    {
                        'dist/css/diagram-js.css': resolvePath('diagram-js', 'assets/diagram-js.css')
                    }
                ]
            },
            bpmn_font: {
                files: [
                    {
                        'dist/css/bpmn-embedded.css': '/node_modules/bpmn-font/dist/css/bpmn-embedded.css'
                    }
                ]
            },
            modeler: {
                files: [
                    {
                        'dist/css/modeler.css': ['styles/modeler.css']
                    }
                ]
            }
        },
        less: {
            options: {
                dumpLineNumbers: 'comments',
                paths: [
                    'node_modules'
                ]
            },

            styles: {
                files: {
                    'dist/css/app.css': 'styles/app.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('default', ['copy', 'less', 'webpack']);
};
