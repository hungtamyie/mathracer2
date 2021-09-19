class AutomatedAnimation{
    constructor(frames, rateOfChange, frameOffsetX, frameOffsetY, frameScale){
        this.currentFrame = 0;
        this.frames = frames;
        this.rateOfChange = rateOfChange;
        this.ticker = 0;
        this.frameOffsetX = frameOffsetX;
        this.frameOffsetY = frameOffsetY;
        this.frameScale = frameScale;
    }
    update(delta){
        this.ticker += delta * this.rateOfChange * 10;
        if(this.ticker > 10){
            this.currentFrame++;
            if(this.currentFrame > this.frames){
                this.currentFrame = 0;
            }
            this.ticker = 0;
        }
    }
}