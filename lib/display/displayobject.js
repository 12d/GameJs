/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-24
 * Time: PM10:31
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){
    /**
     * @private
     * @param canvas
     */
function createCacheCanvas(canvas){
    var cache = canvas.cloneNode();
    cache.height = this.height;
    cache.width = this.width;
    return cache;
}
var CACHE_CANVAS = document.createElement('canvas');

var DisplayObject = new J.Class({
    constructor: function(options){
        var self = this;

        options = options||{};

        self.x = options.x||0;
        self.y = options.y||0;
        self.width = options.width||0;
        self.height = options.height||0;
        self.cacheCanvas = createCacheCanvas.call(this, CACHE_CANVAS);
    },
    Implements: 'event',
    x: 0,

    y: 0,

    width: 0,

    height: 0,

    scaleX: 1,

    scaleY: 1,

    skewX: 0,

    skewY: 0,

    registerX: 0,

    registerY: 0,

    parent: null,

    rotation: 0,
    /**
     * will overwrite in sub class
     * @param context
     */
    draw: function(context){
//        context.clearRect(this.x-20,this.y,this.width, this.height);
        context.drawImage(this.cacheCanvas, this.x, this.y/*, this.width, this.height*/);
    },
    /**
     * is point located in current displayobject
     * @param pointer
     */
    hasPoint: function(point){
        var p = point,
            self = this,
            px = p.x,
            py = p.y,
            sx = self.x,
            sy = self.y;
        return (px>=sx && py>=sy && px<=sx+self.width && py<=sy+self.height)
    }
});


return J.DisplayObject = DisplayObject;


})(J);
