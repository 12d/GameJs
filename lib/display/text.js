/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-24
 * Time: PM10:31
 * To change this template use File | Settings | File Templates.
 */
(function(J, undefined){


    var Text = new J.Class({
        constructor: function(text, styles){

        },
        Extends: J.DisplayObject,
        draw: function(context){
            context.drawRect(0,0,100,100);
        }
    });


    return J.Text = Text;


})(J);
