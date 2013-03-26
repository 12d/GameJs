/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-18
 * Time: PM10:38
 * To change this template use File | Settings | File Templates.
 */
(function (J, undefined){



var
    //@const
    ATTR_SPLIT=/\s+/,
    NOOP = function(){},

    mix = J.mix,

    eventsMap = {},
    attrsMap = {};

window.attrsMap = attrsMap;
function Class(proto){
    function NewClass(options){
//        console.log(this);
        NewClass.prototype.__constructor(options);
        this.__constructor(options);
    }
    var parentClass = proto && proto.Extends;
    var interfaces = proto && proto.Implements;

    //delete internal use method
    interfaces && (delete proto.Implements);
    parentClass && (delete proto.Extends);
    //extend from parentClass
    parentClass && extend(NewClass, parentClass);
    mix(NewClass.prototype, proto);
    // implement from default interfaces
    interfaces && parseImplements(interfaces)(NewClass);

    NewClass.prototype.__constructor = function (options){
        this.__guid = J.guid();
        proto.constructor.call(this, options);
    }||NOOP;
    NewClass.prototype.destructor = function (){
        var guid = this.__guid;
        delete eventsMap[guid];
        delete attrsMap[guid];
        (proto.destructor||NOOP).call(this);
    }
    return NewClass;
}
function parseImplements(Implements){

    var allInterfaces = Class.INTERFACES;
    return function (klass){
        var interfaces = Implements.split(ATTR_SPLIT);
        interfaces.length && interfaces.forEach(function(interfaces){
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
    //extend properties from parent
    child.prototype = new parent;
    //attach super to prototype
    child.prototype.super = function(){
        parent.prototype.constructor.apply(this, arguments);
    }
    // reset constructor
    child.prototype.constructor = child;
}

function makeArray(arrayLikes){
    return Array.prototype.slice.call(arrayLikes);
}
Class.setAttrs = function(klass, attrs){

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
        /**
         *
         * @param {String} eventType
         * @param {Function} (handler)
         * @return {*}
         */
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
        set: function(key, value){
            var guid = this.__guid,
                attrs = attrsMap[guid]||{};

            attrs[key] = value;
            attrsMap[guid] = attrs;
            return this;
        }.overload(),
        get: function(key){
            return (attrsMap[this.__guid]||{})[key];
        }
    }
}
//@exports
return J.Class = Class;
})(J);