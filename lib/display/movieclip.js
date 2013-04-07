;(function (J, undefined){

    /**
     * @class
     * @type {J.Class}
     * @params {Object} options, configs
     * <code>
     *     {
     *         clipImage: Image,
     *         fps: 10,
     *         keyframes: {
     *             left: {
     *                 from: 5,
     *                 to: 10
     *             },
     *             right: {
     *                 from: 10,
     *                 to: 20
     *             }
     *         },
     *         isLoop: true
     *     }
     * </code>
     */
    var MovieClip = new J.Class({
        Extends: J.DisplayObject,
        constructor: function(options){
            var defaultOptions = {
                isLoop: false,
                reduce: 1
            };
            options = J.mix(defaultOptions, options);
            this.clipImage = options.clipImage;
            this.keyframes = options.keyframes||{};
            this.cacheContext = this.cacheCanvas.getContext('2d');
            this.frameWidth = options.frameWidth;
            this.frameHeight = options.frameHeight;
            this.isLoop = options.isLoop;
            this.reduce = options.reduce;
            console.log(this.reduce);
        },
        frameIndex: 0,
        /**
         * goto frame specified and play;
         * @param keyIndex {String}, frame label
         */
        gotoAndPlay: function(keyIndex){
            var keyframe = this.keyframes[keyIndex];

            if(keyframe){
                this.currentFrame = keyframe;
                this.frameIndex = keyframe.from;
            }
            this._isPlaying=true;
        },
        gotoAndStop: function(){

        },
        addKeyFrame: function(keyframe){
            this.keyframes.push(keyframe);
        },
        _isPlaying: false,
        play: function(){
            this.gotoAndPlay(0);
            return this;
        },
        stop: function(){
            this._isPlaying = false;
        },
        draw: function(context, frame){
            var clipImage = this.clipImage,
                frameIndex = this.frameIndex,
                frameWidth = this.frameWidth,
                currentFrame = this.currentFrame;

            this.cacheContext.drawImage(clipImage, frameIndex * frameWidth, 0, frameWidth, this.frameHeight, 0, 0, this.width, this.height);
            //context.drawImage(this.cacheCanvas, this.x, this.y);
            this.parentClass.prototype.draw.call(this, context, frame);
            if(this._isPlaying){
                if(this.frameIndex >= currentFrame.to){
                    if(this.isLoop) {
                        this.frameIndex = currentFrame.from;
                    }else{
                        this.stop();
                    }
                    this.trigger(MovieClip.FINISH);
                }else{
                    if(!(frame % this.reduce)) this.frameIndex++;
                }
            }

        }
    });
    MovieClip.FINISH = 'finish';
    return J.MovieClip = MovieClip;

})(J);