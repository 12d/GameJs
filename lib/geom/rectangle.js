;(function(J, undefined) {

    /**
     * Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
     *
     * @example
     *      var rect = new createjs.Rectangle(0, 0, 100, 100);
     *
     * @class Rectangle
     * @constructor
     * @param {Number} [x=0] X position.
     * @param {Number} [y=0] Y position.
     * @param {Number} [width=0] The width of the Rectangle.
     * @param {Number} [height=0] The height of the Rectangle.
     **/


    var Rectangle = new J.Class({
        constructor: function(x, y, width, height){
            this.x = x||0;
            this.y = y||0;
            this.width = width||0;
            this.height = height||0;
        },
        /**
         * X.
         * @property x
         * @type Number
         **/
        x: 0,
        /**
         * Y.
         * @property y
         * @type Number
         **/
        y: 0,
        /**
         * Width.
         * @property width
         * @type Number
         **/
        width: 0,
        /**
         * Height.
         * @property height
         * @type Number
         **/
        height: 0
    });

    return J.Rectangle = Rectangle;
}());