class ParticlePhysics {
    constructor(particleData){
        this.velocity = new Vector(0,0);
        this.randomize = particleData.randomize;
        this.destroyAfterFirstLoop = particleData.destroyAfterFirstLoop;
        this.fadeSpeed = particleData.fadeSpeed;
        this.lifetime = particleData.lifetime;
        this.gravity = particleData.gravity;
    }
    setVelocity(velocity){
        this.velocity = new Vector(velocity.x, velocity.y);
    }
    update(delta){
        this.lifetime -= delta;
    }
}