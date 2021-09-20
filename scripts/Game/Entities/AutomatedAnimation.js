class AutomatedAnimation{
    constructor(frames, rateOfChange, frameOffsetX, frameOffsetY, isRandom){
        this.currentFrame = 0;
        this.frames = frames - 1;
        this.rateOfChange = rateOfChange;
        this.ticker = 0;
        this.frameOffsetX = frameOffsetX;
        this.frameOffsetY = frameOffsetY;
        this.isRandom = isRandom;
    }
    update(delta){
        this.ticker += delta * this.rateOfChange * 10;
        if(this.ticker > 10){
            if(this.isRandom){
                this.currentFrame = getRandomInt(0, this.frames);
            }
            else {
                this.currentFrame++;
                if(this.currentFrame > this.frames){
                    this.currentFrame = 0;
                }
            }
            this.ticker = 0;
        }
    }
}