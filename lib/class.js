/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-18
 * Time: PM10:38
 * To change this template use File | Settings | File Templates.
 */
//@namespace
var C = {},
    eventsMap = {},
    _guid=0;

function guid(){
    return _guid++;
}

function Class(proto){
    function newClass(){
        newClass.constructor.call(this);
    }
    newClass.prototype = proto;

    //delete internal use method
    delete proto.Implements;
    delete proto.Extends;

    newClass.constructor = proto.constructor||function(){};
    return newClass;
}

function implement(){

}
function extend(){

}

Class.setAttrs = function(){

}
// default interfaces
Class.INTERFACES = {
    'event': {
        trigger: function(eventType, data){
            var hds, events,
                self = this;

            events = (hds=eventsMap[this.__guid]) && hds[eventType];
            if(events && events.length){
                events.forEach(function(event){
                    event.call(self, data);
                });
            }
            return self;
        },
        on: function(eventType, handler){
            var hds = eventsMap[this.__guid]||(eventsMap[this.__guid]={}),
                events = hds[eventType]||(hds[eventType]=[]);

            events.push(handler);
            return this;
        },
        off: function(eventType, handler){
            var guid = this.__guid,
                hds = eventsMap[guid],
                events;

            if(!handler) {
                delete eventsMap[guid];
                return this;
            }

            hds && (events = hds[eventType]) && (function(){
                if(handler){
                    events.splice(events.indexOf(handler),1);
                }else{
                    delete hds[eventType];
                }
            })();
            return this;
        }
    },
    'attr': {
        setter: function(){

        }.multiAttr(),
        getter: function(){

        }
    }
}

var NewClass = new Class({
    Implements: [Class.EVENT],
    Extends: [],
    constructor: function (){
        this.name='110';
    }
});
var newInstance = new NewClass();

