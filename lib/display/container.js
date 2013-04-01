/**
 * @class Container
 * @extends DisplayObject
 * @constructor
 * @param {HTMLCanvasElement | String | Object} canvas A canvas object that the Stage will render to, or the string id
 * of a canvas object in the current document.
 **/
(function(J, undefined){

    var Container = new J.Class({
        constructor: function(){

        },
        Extends: J.DisplayObject,
        children: [],
        draw: function(context){
            var lists = this.children,
                len = lists.length,
                i=0;

            for(;i<len;i++){
                lists[i].trigger('tick').draw(context);
            }
        },
        addChild: function(child){
            this.children.push(child);
        }
    });


    return J.Container = Container;


})(J);
