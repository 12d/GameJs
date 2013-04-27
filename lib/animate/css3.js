/**
 * @author: xuweichen
 * @date: 13-4-25 下午4:18
 * @descriptions
 * @required [Style]
 */
;(function (J, undefined){
        //CSSStyleRule的模板
    var classRule = "${prefix}animation: ${frameName} ${duration} ${easing} ${count} ${direction};",
        //CSSKeyframesRule的模板
        frameRule = "0%{ ${property}:${from}; } 100%{  ${property}:${to}; }",
        animationClassPrefix = '_animate_class_',
        animationKeyframePrefix = '_animate_key_',
        StyleManager = J.StyleManager,
        Ease = J.Ease,
        mix = J.mix,
        defaultAnimationSetting = {
            easing: 'ease-in-out',
            count: 1,
            prefix: '-webkit-',
            direction: 'alternate'
        },
        formatString = J.format,
        /**
         * @private
         * @const
         */
        ANIMATION_PLAY_STATE = '-webkit-animation-play-state';

    function addKeyframe(cssData){
        return formatString(frameRule, cssData);
    };

    function createCSS3Animation(cssData){
        var property = cssData.property;
//        console.log(cssData);
        cssData = mix(mix({}, defaultAnimationSetting),cssData);
        cssData.duration = cssData.duration+'ms';
        cssData.from = property+":"+cssData.from;
        cssData.to = property+":"+cssData.to;
        console.log(formatString(classRule, cssData));
        return formatString(classRule, cssData)
    }
    var Tween = new J.Class({
        constructor: function(options){
            var self = this;

            //self.options = {};
            //mix(self.options, options);
            self.target = options.target;
            self.setOptions(options);
            !Tween.styleElement && (Tween.styleElement = StyleManager.addStyle());
        },
        Implements: 'event attr',
        options: {
            from: 0
        },
        start: function(from, to){
            var self = this,
                setting = defaultAnimationSetting,
                guid = J.guid(),
                animationClass = animationClassPrefix+guid,
                animationKeyClass = animationKeyframePrefix+guid;

            StyleManager.insertRule('.'+animationClass, createCSS3Animation({
                frameName: animationKeyClass,
                duration: self.get('duration')||setting.duration,
                direction: self.get('direction')||setting.direction,
                easing: self.get('easing')||setting.easing,
                count: self.get('count')
            }));

            StyleManager.insertRule('@-webkit-keyframes '+animationKeyClass, addKeyframe({
                from: from||self.get('from'),
                to: to||self.get('to'),
                property: self.get('property')
            }))
            this.target.classList.add(animationClass);
            //StyleManager.insertRule
            this._isPlaying = true;
            this._initEvent(animationClass, animationKeyClass);
            return this;
        },
        _initEvent: function(klass, keyframe){
            var self = this,
                endHandler = function(){
                    var target = self.target;

                    self.trigger('end', target);
                    target.removeEventListener('webkitAnimationEnd', endHandler);
                    target.classList.remove(klass);
                    StyleManager.deleteRule('.'+klass);
                    StyleManager.deleteRule(keyframe, true);
                };

            self.target.addEventListener('webkitAnimationEnd', endHandler);
        },
        stop: function(){
            this._isPlaying = false;
            this.target.style[ANIMATION_PLAY_STATE] = 'paused';
            this.trigger(Tween.TWEEN_FINISH);
            return this;
        },
        pause: function(){
            self._isPlaying = false;
            this.target.style[ANIMATION_PLAY_STATE] = 'paused';
            return this;
        },
        resume: function(){
            self._isPlaying = true;
            this.target.style[ANIMATION_PLAY_STATE] = 'running';
            return this;
        },
        /**
         * TODO: custom key frame
         * @param keyframe
         */
        addKeyframe: function(keyframe){

        }
    });

    Tween.TWEEN_START = 'tweenStart';
    Tween.TWEEN_FINISH = 'tweenFinish';

//    return J.Tween = Tween;


    tween = new Tween({
        duration: 1000,
        property: 'height',
        target: document.getElementById('test2'),
        count: 1,
        from: '0px',
        to: '100px'
    }).start().on('end', function(){
//            tween2.start('blue', 'yellow');
        });

/*    tween2 = new Tween({
        duration: 1000,
        property: 'background',
        target: document.getElementById('test2'),
        count: 1,
        from: 'red',
        to: 'blue'
    }).on('end', function(){
            //tween.start();
        })//.start();*/

    window.Tween = Tween;
})(J);


