/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-24
 * Time: PM10:31
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){


var DisplayObject = new J.Class({
    constructor: function(){

    },
    x: 0,

    y: 0,

    scaleX: 1,

    scaleY: 1,

    skewX: 0,

    skewY: 0,

    registerX: 0,

    registerY: 0,

    parent: null,

    rotation: 0,

    draw: function(context){
        context.drawRect(0,0,100,100);
    }
});


return J.DisplayObject = DisplayObject;


})(J);
