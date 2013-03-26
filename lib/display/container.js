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
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        registerX: 0,
        registerY: 0,
        parent: null,
        rotation: 0
    });


    return J.Container = Container;


})(J);
