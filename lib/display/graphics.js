/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-24
 * Time: PM10:31
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){


    var Graphics = new J.Class({
        constructor: function(context){
            this.context = context;
        },
        /**
         * draw a rectangle
         * @param {int} x
         * @param {int} y
         * @param {int} width
         * @param {int} height
         */
        drawRect: function(x, y, width, height){
            var context = this.context;
            context.fillStyle="#0000ff";
            context.fillRect(x,y,width,height);
            return this;
        },
        /**
         * draw a circle
         * @param {int} x
         * @param {int} y
         * @param {int} radius
         * @returns {DisplayObject}
         */
        drawCircle: function(x, y, radius){
            var context = this.context;
            context.fillStyle="#ff00ff";
            context.beginPath();
            context.arc(x,y,50,0,Math.PI*2,false);
            context.closePath();
            context.fill();
            return this;
        }
    });


    return J.Graphics = Graphics;


})(J);
