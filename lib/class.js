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

    eventsMap = {},
    attrsMap = {};

window.attrsMap = attrsMap;
function Class(proto){
    function NewClass(options){

        NewClass.prototype.__constructor.call(this, options);
    }
    var parentClass = proto.Extends;
    var interfaces = proto.Implements;

    //delete internal use method
    delete proto.Implements;
    delete proto.Extends;

    parentClass && extend(NewClass, parentClass);
    mix(NewClass.prototype, proto);
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
    child.prototype.super = parent;
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

    J.mix = mix;
//@exports
return J.Class = Class;
})(J);