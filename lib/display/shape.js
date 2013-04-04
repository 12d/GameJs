/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-24
 * Time: PM10:31
 * @required Graphics
 */
(function(J, undefined){


    var Shape = new J.Class({
        Extends: J.DisplayObject,
        constructor: function(options){
//            this.super(options);
            this.graphics = new J.Graphics(this.cacheCanvas.getContext('2d'));
        }
    });


    return J.Shape = Shape;


})(J);
