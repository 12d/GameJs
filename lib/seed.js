/**
 * @author: xuweichen
 * @date: 13-3-21 下午5:17
 * @descriptions
 */
//@namespace
var J = {};
(function(J, undefined){


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
                fn(key, val);
            }
            return this;
        }

    }

    /**
     * copy all properties in the supplier to the receiver
     * @param r {Object} receiver
     * @param s {Object} supplier
     * @param or {boolean=} whether override the existing property in the receiver
     * @param cl {(Array.<string>)=} copy list, an array of selected properties
     */
    function mix(r, s, or, cl) {
        if (!s || !r) return r;
        var i = 0, c, len;
        or = or || or === undefined;

        if (cl && (len = cl.length)) {
            for (; i < len; i++) {
                c = cl[i];
                if ( (c in s) && (or || !(c in r) ) ) {
                    r[c] = s[c];
                }
            }
        } else {
            for (c in s) {
                if (or || !(c in r)) {
                    r[c] = s[c];
                }
            }
        }
        return r;
    };


    J.guid = guid;
    J.mix = mix;
})(J);
