/**
 * @author: xuweichen
 * @date: 13-8-30 下午12:40
 * @descriptions
 */
;(function (J, undefined){
    function getEase(name){
        var ns = name.split('.');
        return J.Ease[ns[0]][ns[1]];
    };

    var Timeline = new J.Class({
        Implements: 'event attr',
        constructor: function(options){
            var self = this;

            self.options = {};

            J.mix(self.options, options);
            self.set(self.options);
            self.get('tween') && self.addTween(self.get('tween'));
        },
        addLabel: function(){

        },
        addTween: function(tween){
            var self = this;
            self.set('tween', tween);
            self.frames = self._calculateFrames(tween.get('from'), tween.get('to'), tween.get('duration') * tween.get('fps'));

            tween.timeline(self);
        },
        removeTween: function(){

        },

        _calculateFrames: function(from, to, steps){
            var self = this,
                ease = getEase(self.get('tween').get('easing')),
                i = steps,
                frames = [];

            while(i--) {
                frames.unshift(from + ease(i+1, from, to, steps));
            };
            return frames;
        }
    });
    J.Timeline = Timeline;
})(J);
