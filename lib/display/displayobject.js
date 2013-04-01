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
    /**
     * will overwrite in sub class
     * @param context
     */
    draw: function(context){
        context.drawImage(this.cacheCanvas, this.x, this.y);
    }
});


return J.DisplayObject = DisplayObject;


})(J);
