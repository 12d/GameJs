/**
 * @author: xuweichen
 * @date: 13-9-2 下午1:18
 * @descriptions
 */
;(function (J, undefined){
    J.Queue = new J.Class({
        Implements: 'event attr',
        constructor: function(options){
            this._cached = [];
            this.setCurrent(0);
        },
        count: function(){
            return this._cached.length;
        },
        add: function(item){
            this._cached.push(item);
            return this;
        },
        remove: function(item){
            this.removeAt(this._cached.indexOf(item));
            return this;
        },
        setCurrent: function(index){
            this._current = index;
            return this;
        },
        last: function(){
            var cached = this._cached,
                count = cached.length;

            return count ? cached[count-1] : null;
        },
        previous: function(){
            var cached = this._cached,
                current = (this._current --);

            return cached.length ? cached[current>=0 ? current : 0] : null;
        },
        next: function(){
            var cached = this._cached,
                count = cached.length,
                current = (this._current ++);

            return cached.length ? cached[current<count ? current : count-1] : null;
        },
        removeAt: function(index){
            return this._cached.splice(index, 1)[0];
        },
        item: function(index){
            return this._cached[index];
        },
        clear: function(){
            this._cached = [];
            return this;
        },
        _manipulate: function(fn){
            fn.call(this, this._cached);
            return this;
        }
    });
})(J);