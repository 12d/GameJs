/**
 * @class Container
 * @extends DisplayObject
 * @constructor
 * @param {HTMLCanvasElement | String | Object} canvas A canvas object that the Stage will render to, or the string id
 * of a canvas object in the current document.
 **/
(function(J, undefined){

    var Container = new J.Class({
        constructor: function(options){
//            this.super.call(this, options);
//            console.log(this.super === J.DisplayObject.prototype.constructor);
//            console.log(this.super);
//            J.DisplayObject.prototype.constructor.call(this, options);
//            console.log(options);
            this.children = [];
        },
        Extends: J.DisplayObject,
        draw: function(context, frame){
            var lists = this.children,
                len = lists.length,
                i=0;

            for(;i<len;i++){
                lists[i].trigger('tick', {frame: frame}).draw(context, frame);
                //console.log(1);
            }
        },
        addChild: function(child){
            child.parent = this;
            this.children.push(child);
            return this;
        }
    });


    return J.Container = Container;


})(J);
