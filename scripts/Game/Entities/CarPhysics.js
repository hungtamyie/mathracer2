class CarPhysics {
    constructor(){
        this.velocity = new Vector(0, 0);
        this.direction = new Vector(1, 0);
        this.accelerating = 0;
        this.turning = 0;
        this.tractionControl = false;
        
        this.boosting = false;
        this.boostTimer = 0;
        this.rpm = 0;
        this.slideAngle = 0;
        this.currentTerrain = "ROAD";
        this.velocityDirection = 0;
    }
}