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

//get bpmn-js
var SeplModeler = require('bpmn-js/lib/Modeler');

//load additional modules
var additionalModules = [
    require('bpmn-js-properties-panel'),
    require('bpmn-js-properties-panel/lib/provider/camunda'),
    require('./device-provider'),
];

//add additional (default!) modules to bpmn-js
SeplModeler.prototype._modules = SeplModeler.prototype._modules.concat(additionalModules);

//add camunda moddle descriptor
var camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');
SeplModeler.prototype._moddleExtensions.camunda = camundaModdleDescriptor;

//export
module.exports = SeplModeler;
