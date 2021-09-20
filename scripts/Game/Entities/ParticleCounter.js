class ParticleCounter {
    constructor(speed){
        this.speed = speed;
        this.counter = 0;
        this.makeParticleThisTick = false;
    }
    update(delta){
        this.counter += this.speed * delta;
        if(this.counter >= 100){
            this.counter = 0;
            this.makeParticleThisTick = true;
        }
        else {
            this.makeParticleThisTick = false;
        }
    }
    setSpeed(speed){
        this.speed = speed;
    }
}