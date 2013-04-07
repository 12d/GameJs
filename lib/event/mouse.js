/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-4-5
 * Time: PM10:36
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){
var canvas = game,
    Event = J.Event,
    Point = J.Point,
    globalHandlers;

globalHandlers = {
    click: function(e){
        var targets = Event.getTargetsByType('click');
        targets.forEach(function (target){
            if(target.hasPoint(new Point(e.offsetX, e.offsetY))){
                target.trigger('click');
            }
        });

    },
    mousedown: function (){

    },
    mouseup: function (){

    },
    mousemove: function (){

    }
};
//TODO : use forEach to avoid repeating copying
canvas.addEventListener('click', globalHandlers.click);


var MouseEvent = new J.Class({
    constructor: function(options){

    },
    which: 1,
    Extends: J.Event
});

MouseEvent.LEFT =  1;
MouseEvent.RIGHT = 2;

return J.MouseEvent = MouseEvent;

})(J);
