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

var iotProps = require('./parts/IotProps');

var ImplementationTypeHelper = require('bpmn-js-properties-panel/lib/helper/ImplementationTypeHelper');
var is = require('bpmn-js/lib/util/ModelUtil').is;
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;
var inherits = require('inherits');
var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');

var CamundaProvider = require('bpmn-js-properties-panel/lib/provider/camunda').propertiesProvider[1];

function IotDeviceProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, bpmnjs, replace, selection, modeling, translate) {
    this.getTabs = function(element) {
        var camunda = new CamundaProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate);
        var camundaTabs = camunda.getTabs(element);
        camundaTabs[0].groups.unshift(createIotInfoGroup(element, bpmnjs));
        camundaTabs[0].groups.unshift(createIotExternalTaskGroup(element, bpmnjs, eventBus, bpmnFactory, replace, selection));
        camundaTabs[0].groups.unshift(createInfluxTaskGroup(element, bpmnjs, eventBus, bpmnFactory, replace, selection));
        camundaTabs[0].groups.unshift(createTimeEventHelperGroup(element, bpmnjs, eventBus, modeling));
        return camundaTabs;
    };
}

var isTask = function(element){
  return is(element, "bpmn:Task") && !is(element, "bpmn:ReceiveTask")
};

var isEvent = function(element) {
    return element.type == "bpmn:StartEvent"  || element.type == "bpmn:IntermediateCatchEvent";
};

var isTimeEvent = function (element) {
    return element.businessObject && element.businessObject.eventDefinitions && element.businessObject.eventDefinitions[0] && element.businessObject.eventDefinitions[0].$type == "bpmn:TimerEventDefinition"
};

function createIotExternalTaskGroup(element, bpmnjs, eventBus, bpmnFactory, replace, selection) {
    var iotGroup = {
        id: 'iot-extern',
        label: 'IoT-Device',
        entries: [],
        enabled: isTask
    };
    iotProps.external(iotGroup, element, bpmnjs, eventBus, bpmnFactory, replace, selection);
    return iotGroup;
}


function createInfluxTaskGroup(element, bpmnjs, eventBus, bpmnFactory, replace, selection) {
    var iotGroup = {
        id: 'iot-influx',
        label: 'Historic Data',
        entries: [],
        enabled: isTask
    };
    iotProps.influx(iotGroup, element, bpmnjs, eventBus, bpmnFactory, replace, selection);
    return iotGroup;
}


function createIotInfoGroup(element, bpmnjs) {
    var infoGroup = {
        id: 'iot-info',
        label: 'IoT-Info',
        entries: [],
        enabled: isTask
    };
    iotProps.info(infoGroup, element, bpmnjs);
    return infoGroup;
}

function createTimeEventHelperGroup(element, bpmnjs, eventBus, modeling){
    var timeEventGroup = {
        id: 'time-event-helper',
        label: 'Time-Event-Helper',
        entries: [],
        enabled: isTimeEvent
    };
    iotProps.timeHelper(timeEventGroup, element, bpmnjs, eventBus, modeling);
    return timeEventGroup;
}



IotDeviceProvider.$inject = [
    'eventBus',
    'bpmnFactory',
    'elementRegistry',
    'elementTemplates',
    'bpmnjs',
    'replace',
    'selection',
    'modeling',
    'translate'
];

inherits(IotDeviceProvider, PropertiesActivator);

module.exports = IotDeviceProvider;