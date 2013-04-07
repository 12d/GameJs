/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-4-5
 * Time: PM10:38
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){
var nativeEvents = ['click', 'mousedown', 'mousemove', 'mouseup', 'touchStart'],
    eventsMap = {},
    nativeEventTargets = {};

var Event = new J.Class({
    constructor: function(options){
        options = options||{};
        this.type = options.type;
        this.data = options.data;
    },
    type: undefined,
    data: null,
    toString: function (){
        return "[Event (type="+this.type+")]";
    }
});


//@interface
J.mix(J.Class.INTERFACES, {
//@event interface
    'event': {
        trigger: function(type, data){
            var event = new Event({type: type, data: data});
            this.dispatch(event);
            return this;
        },
        on: function(eventType, handler){
            var hds = eventsMap[this.__guid]||(eventsMap[this.__guid]={}),
                events = hds[eventType]||(hds[eventType]=[]);
            /*
            if(Event.isNative(eventType)) {
                J.Stage.currentStage.canvas.addEventListener(eventType, handler);
            }else{
                events.push(handler);
            }
            */
            if(isNative(eventType)){
                var targets = nativeEventTargets[eventType]||[];
                targets.push(this);
                nativeEventTargets[eventType] = targets;
            }
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
        },
        /**
         * dispatch an event
         * @param event {Event}
         */
        dispatch: function(event){
            var hds, events,
                eventType = event.type,
                self = this;

            event.target = self;
            events = (hds=eventsMap[this.__guid]) && hds[eventType];
            if(events && events.length){
                events.forEach(function(handler){
                    handler.call(self, event);
                });
            }

            return self;
        }
    }
});

function isNative(eventType){
    return nativeEvents.indexOf(eventType)>-1;
}


function getTargetsByType(eventType){
    return nativeEventTargets[eventType]||[];
}
/**
 * @static
 * @param {String} eventType, type of event
 * @return {Boolean}
 */
Event.isNative = isNative;

//@static
Event.getTargetsByType = getTargetsByType;

return J.Event = Event;

})(J);



