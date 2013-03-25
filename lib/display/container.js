/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-24
 * Time: PM10:31
 * To change this template use File | Settings | File Templates.
 */
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
                lists[i].draw(context);
            }
        }
    });


    return J.Container = Container;


})(J);
