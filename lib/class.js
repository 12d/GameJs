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



function rendConstructor(parentClass, args){
//    console.log(parentClass);
    var constructors = [],
        self = this;

    while(parentClass){
        constructors.push(parentClass.prototype.constructor);
        parentClass = parentClass.prototype.parentClass;
    }

//    //call constructors
    constructors.reverse().forEach(function(constructor){
        constructor.call(self, args);
    });
}

function Class(proto){
    function NewClass(options){
        this.__guid = J.guid();
        //rend constructor from parent/grand-parent class
        this.parentClass && rendConstructor.call(this, this.parentClass, options);
        this.constructor.call(this, options);
    }

    var parentClass = proto && proto.Extends,
        interfaces = proto && proto.Implements;

    //delete internal use method
    interfaces && (delete proto.Implements);
    parentClass && (delete proto.Extends);

    //extend from parentClass
    parentClass && extend(NewClass, parentClass);

    //mix prototype with parent
    mix(NewClass.prototype, proto);
    // implement from default interfaces
    interfaces && parseImplements(interfaces)(NewClass);
    return NewClass
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
//    child.prototype = new parent;
    //attach super to prototype
    /*child.prototype.super = function(){
        parent.prototype.constructor.apply(this, arguments);
    }*/
//    child.prototype.super = parent.prototype.constructor;
    // reset constructor
//    child.prototype.constructor = child;


    var F = function(){}
    F.prototype = parent.prototype;

    var newProto = new F();
    child.prototype = newProto;
//    child.prototype.super = parent.prototype.constructor;
    child.prototype.parentClass = parent;
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