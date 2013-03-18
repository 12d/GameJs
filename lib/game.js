/**
 * @author: xuweichen
 * @date: 13-3-11 下午4:44
 * @descriptions
 */
//(function (window){


var eventsMap = {},
    _guid = 0,
    frame = 0,
    nextFrameTime,
    requestAnimationFrame = (function() {
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

function Game(options){
    this.options = options||{};
    this.fps = this.options.fps;
    this._guid=guid();
    this.stage = options.stage;
    // entities
    this._entities = [];

    this.initialize();
};
function guid(){
    return _guid++;
};

Game.prototype = {
    constructor: Game,

    initialize: function(){
        this._frameTime = 1000/ this.fps;
    },
    //@controls
    play: function(){
        var self = this;
        nextFrameTime = Date.now();
        (function animloop(){
            self._step();
            requestAnimationFrame(animloop);
        })();
        return self;
    },
    pause: function(){
        return this;
    },
    end: function(){
        return this;
    },
    // @events
    trigger: function(eventType, data){
        var hds, events,
            self = this;

        events = (hds=eventsMap[this._guid]) && hds[eventType];
        if(events && events.length){
            events.forEach(function(event){
                event.call(self, data);
            });
        }
        return self;
    },
    on: function(eventType, handler){
        var hds = eventsMap[this._guid]||(eventsMap[this._guid]={}),
            events = hds[eventType]||(hds[eventType]=[]);

        events.push(handler);
        return this;
    },
    off: function(eventType, handler){
        var guid = this._guid,
            hds = eventsMap[guid],
            events;

        if(!handler) {
            delete eventsMap[guid];
            return this;
        }

        hds && (events = hds[eventType]) && (function(){
            if(handler){
                events.splice(events.indexOf(handler),1);
            }else{
                delete hds[eventType];
            }
        })();
        return this;
    },
    //@ animate
    _step: function(){
        loops = 0;
        while(Date.now() > nextFrameTime) {
            this.trigger(Game.ENTER_FRAME, {frame: frame++});
            nextFrameTime += this._frameTime;
            loops++;
        }

        //draw
        if(loops) {
            this.draw();
        }
    },
    clear: function(x,y,w,h){
        var args = arguments;
            canvas = this.stage,
            context = canvas.getContext('2d');

        x = args[0]||0;
        y = args[1]||0;
        w = args[2]||canvas.width;
        h = args[3]||canvas.height;

        context.clearRect(x,y,w,h);
        return context;
    },
    /**
     * draw a frame for animation
     */
    draw: function(){
        var context = this.clear(); //clear stage
        this._entities.forEach(function(entity){
            entity.drawTo(context);
        });
    },
    addEntity: function(entity){
        this._entities.push(entity);
    },
    getEntity: function(index){
        return this._entities[index];
    }
}
//@event type
Game.ENTER_FRAME = 'enterFrame';

function Entity(context){
    //this.context = context;
}
Entity.prototype = {
    constructor: Entity,
    drawTo: function (context){
        //var context = this.context;
        context.fillStyle = 'rgba(250,0,0,1)';
        context.fillRect(this.x, this.y,this.width, this.height);
    },
    clear: function(){
        //this.context.clearRect(x,y,width,height);
    },
    x: 0,
    y: 0,
    vX: 1,
    vY: 10,
    height:50,
    width: 50

}






var game = new Game({
    fps: 25,
    stage: document.getElementById('stage')
});
game.addEntity(new Entity());
i=0;
game.on(Game.ENTER_FRAME, function(){
    var entity = this.getEntity(0);
    entity.x+=entity.vX+entity.vX*Math.sin(i++);
});



//})(window);