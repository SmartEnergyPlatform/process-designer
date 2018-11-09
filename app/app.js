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

//import BpmnJS from 'bpmn-js/lib/Modeler'
var Modeler = require('bpmn-js/lib/Modeler').default;
var Viewer = require('bpmn-js/lib/Viewer').default;
var panel = require('bpmn-js-properties-panel');
var camunda_panel = require('bpmn-js-properties-panel/lib/provider/camunda');
var device_provider = require('./device-provider');

var additionalModules = [
    panel,
    camunda_panel,
    device_provider
    /*,
    {translate: ['value', function (template, replacements) {
        console.log("test", template, replacements);
        replacements = replacements || {};
        return template.replace(/{([^}]+)}/g, function(_, key) {
            return replacements[key] || '{' + key + '}';
        });
    }]}
    */
];

var camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');
module.exports = {
    modeler: function (options) {
        var extendedOptions = options;
        extendedOptions.additionalModules = additionalModules;
        extendedOptions.moddleExtensions = {
            camunda: camundaModdleDescriptor
        };
        return new Modeler(extendedOptions)
    },
    viewer: function (options) {
        return new Viewer(options)
    }
};