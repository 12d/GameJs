/**
 * @author: xuweichen
 * @date: 13-3-21 下午5:17
 * @descriptions
 */
//@namespace
var J = {};
;(function (J, undefined){

var _guid=0;

function guid(){
    return _guid++;
}



function isObject(obj){
    return /Object/.test(Object.prototype.toString.call(obj));
}
Function.prototype.overload = function(){
    var fn = this;
    return function (key, val){
        var keys = key;
        if(isObject(keys)){
            for(key in keys){
                fn.call(this, key, keys[key]);
            }
        }else{
            fn.call(this, key, val);
        }
        return this;
    }

}


J.guid = guid;

})(J);
