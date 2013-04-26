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
            easing: 'linear',
            count: 1,
            prefix: '-webkit-',
            direction: 'alternate'
        },
        formatString = J.format;

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
        //addKeyframe
        return formatString(classRule, cssData)
    }
    var Tween = new J.Class({
        constructor: function(options){
            var self = this;
            mix(self.options, options);
            self.target = self.options.target;
            self.set(self.options);
            StyleManager.addStyle();
        },
        options: {
            from: 0
        },
        Implements: 'event attr',
        start: function(){
            var opts = this.options,
                setting = defaultAnimationSetting,
                guid = J.guid(),
                animationClass = animationClassPrefix+guid,
                animationKeyClass = animationKeyframePrefix+guid;

            StyleManager.insertRule('.'+animationClass, createCSS3Animation({
                frameName: animationKeyClass,
                duration: opts.duration||setting.duration,
                direction: opts.direction||setting.direction,
                easing: opts.easing||setting.easing,
                count: opts.count
            }));

            StyleManager.insertRule('@-webkit-keyframes '+animationKeyClass, addKeyframe({
                from: opts.from,
                to: opts.to,
                property: opts.property
            }))
            this.target.classList.add(animationClass);
            //StyleManager.insertRule
            this._isPlaying = true;
            return this;
        },
        /*
        _move: function (){
            var self = this,
                property = self.get('property'),
                target = self.get('target');

            if(self._isPlaying && ((target[property]+=self._getDelta())>=self.get('to'))){
                self.stop();
            }

        },
        */
        stop: function(){
            this._isPlaying = false;
            this.trigger(Tween.TWEEN_FINISH);
            return this;
        },
        pause: function(){
            self._isPlaying = false;

            return this;
        },
        resume: function(){
            self._isPlaying = true;
            return this;
        }
    });

    Tween.TWEEN_START = 'tweenStart';
    Tween.TWEEN_FINISH = 'tweenFinish';

//    return J.Tween = Tween;


     window.tween = new Tween({
        duration: 2000,
        property: 'height',
        target: document.getElementById('test'),
        count: 'infinite',
        from: '0px',
        to: '100px'
    }).start();
    var tween2 = new Tween({
        duration: 2000,
        property: 'width',
        target: document.getElementById('test'),
        count: 'infinite',
        from: '0px',
        to: '100px'
    }).start()
})(J);


