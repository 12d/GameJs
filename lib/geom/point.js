(function(J, undefined) {

    /**
     * Represents a point on a 2 dimensional x / y coordinate system.
     *
     * <h4>Example</h4>
     *      var point = new Point(0, 100);
     *
     * @class Point
     * @constructor
     * @param {Number} [x=0] X position.
     * @param {Number} [y=0] Y position.
     **/
    var Point = new J.Class({
        constructor: function(x, y){
            this.x = x||0;
            this.y = y||0;
        },
        /**
         * X position.
         * @property x
         * @type Number
         **/
        x: 0,
        /**
         * Y position.
         * @property y
         * @type Number
         **/
        y: 0
    });





    return J.Point = Point;
}(J));