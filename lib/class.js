/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-18
 * Time: PM10:38
 * To change this template use File | Settings | File Templates.
 */
//@namespace
var C = {},

    //@const
    ATTR_SPLIT=',',

    eventsMap = {},
    _guid=0;

function guid(){
    return _guid++;
}
function isObject(obj){
    return /Object/.test(Object.prototype.toString.call(obj));
}
Function.prototype.overload = function(){
    var fn = this;
    return function (key, val){
        var keys = key;
        if(isObject(keys)){
            for(key in keys){
                fn(key, val);
            }
        }else{
            fn(key, val);
        }
        return this;
    }

}

function Class(proto){
    function NewClass(){
        NewClass.constructor.call(this);
    }

    extend(NewClass, proto.Extends);
    parseImplements(proto.Implements)(NewClass);
    //delete internal use method
    delete proto.Implements;
    delete proto.Extends;

    NewClass.prototype.constructor = proto.constructor||function(){};
    return NewClass;
}
function parseImplements(Implements){
    var allInterfaces = Class.INTERFACES;
    return function (klass){
        Implements.split(ATTR_SPLIT).forEach(function(interfaces){
            implement(klass, allInterfaces[interfaces]);
        });
    }
}
function implement(klass, interfaces){
    var args = makeArray(arguments);

    args.shift();
    args.forEach(function(arg){
        mix(klass.prototype, arg);
    });

}
function extend(child, parent){
    child.prototype = new parent;
    child.prototype.constructor = child;
}

function makeArray(arrayLikes){
    return Array.prototype.slice.call(arrayLikes);
}
/**
 * copy all properties in the supplier to the receiver
 * @param r {Object} receiver
 * @param s {Object} supplier
 * @param or {boolean=} whether override the existing property in the receiver
 * @param cl {(Array.<string>)=} copy list, an array of selected properties
 */
function mix(r, s, or, cl) {
    if (!s || !r) return r;
    var i = 0, c, len;
    or = or || or === undefined;

    if (cl && (len = cl.length)) {
        for (; i < len; i++) {
            c = cl[i];
            if ( (c in s) && (or || !(c in r) ) ) {
                r[c] = s[c];
            }
        }
    } else {
        for (c in s) {
            if (or || !(c in r)) {
                r[c] = s[c];
            }
        }
    }
    return r;
};
Class.setAttrs = function(){

}
//default attributes
Class.ATTRS = {
    'attr': {
        setter: function(){

        },
        getter: function(){

        }
    }
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
        } .overload(),
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
    }
}

var NewClass = new Class({
    Implements: 'event',
    Extends: Array,
    constructor: function (){
        this.name='110';
    }
});
var newInstance = new NewClass();

