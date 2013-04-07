/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-4-5
 * Time: PM10:36
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){

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
