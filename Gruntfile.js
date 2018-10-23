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

    /**
     * Resolve external project resource as file path
     */
    function resolvePath(project, file) {
        return path.join(path.dirname(require.resolve(project)), file);
    }

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {

            // create customized bower bundle
            bower: {
                files: {
                    'dist/index.js': ['app/app.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'SeplModeler',
                        // strip unnecessary built-ins
                        builtins: ['events'],
                        insertGlobalVars: {
                            process: function () {
                                return 'undefined';
                            },
                            Buffer: function () {
                                return 'undefined';
                            }
                        }
                    }
                }
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
            bpmn_js: {
                files: [
                    {
                        'dist/css/bpmn-embedded.css': resolvePath('bpmn-js', 'assets/bpmn-font/css/bpmn-embedded.css')
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
        },
    });

    grunt.registerTask('default', ['copy', 'less', 'browserify:bower']);
};
