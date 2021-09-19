class Game {
    constructor(mapName, mapTerrainData){
        this.mapName = mapName;
        this.mapTerrainData = mapTerrainData;
        this.entities = {};
        this.obstacles = {};
        this.ghosts = {};
        this.checkpoints = {};
        this.playerCar;
        this.checkpointData = {
            order: [],
            next: 0,
            previousDistanceFromNext: Infinity,
        };
        
        this.loadInBackground();
        this.loadInObstacles();
        this.loadInCheckpoints();
    }
    
    loadInCar(id, carPreset, isGhost){
        let newCar;
        if(id){
            newCar = new Entity("car", id);    
        }
        else {
            newCar = new Entity("car");    
        }
        let spawnPos = MAP_DATA[this.mapName].spawnPos;
        let carDir = MAP_DATA[this.mapName].spawnDir;
        let carData = CAR_DATA[carPreset.car];
        newCar.addComponent("carPhysics", (new CarPhysics()));
        newCar.addComponent("position", (new Position(spawnPos.x, spawnPos.y)));
        newCar.carPhysics.direction.x = carDir.x;
        newCar.carPhysics.direction.y = carDir.y;
        newCar.addComponent("carSpecs", (new CarSpecs(carPreset.car)));
        if(carPreset.spoiler != "none"){
            newCar.carSpecs.applyModifiers(CAR_DATA[carPreset.car].spoilers[carPreset.spoiler].modifiers);
        }
        newCar.addComponent("visualData", (new VisualData(("sprite_" + id), 0, 0, CAR_DATA[carPreset.car].spriteDimensions.drawSize, CAR_DATA[carPreset.car].spriteDimensions.drawSize, 1, CAR_DATA[carPreset.car].spriteDimensions.drawHeightOffset)));
        newCar.addComponent("hitbox", (new Hitbox()));
        this.updateCarHitbox(newCar);
        this.entities[id] = newCar;
        if(!isGhost){
            this.playerCar = newCar;
        }
    }
    loadInBackground(){
        let width = MAP_DATA[this.mapName].width;
        let height = MAP_DATA[this.mapName].height;
        let background = new Entity("background");
        background.addComponent("position", (new Position(0,0)));
        background.addComponent("visualData", (new VisualData((this.mapName + "_map"), 0, 0, width, height)));
        this.entities[background.id] = background;
    }
    loadInObstacles(){
        let obstacles = MAP_DATA[this.mapName].obstacles
        for(let i = 0; i < obstacles.length; i++){
            let newObstacle = this.createObstacleEntity(obstacles[i][0], obstacles[i][1], obstacles[i][2]);
            this.entities[newObstacle.id] = newObstacle;
            this.obstacles[newObstacle.id] = newObstacle;
        }
    }
    loadInCheckpoints(){
        let checkpoints =  MAP_DATA[this.mapName].checkpoints;
        
        let checkpoint = new Entity("checkpoint");
        let x = checkpoints[0][0];
        let y = checkpoints[0][1];
        checkpoint.addComponent("visualData", new VisualData("checkpoints", 0, 0, 5, 3, 32, 50))
        checkpoint.addComponent("position", (new Position(x,y)));
        checkpoint.addComponent("automatedAnimation", new AutomatedAnimation(2, 1, 0, 3));
        checkpoint.addComponent("hitbox", new Hitbox([{type: "line", p1: {x: x -50, y: 300}, p2: {x: x + 50, y: 200}}]));
        checkpoint.visualData.noShow = false;
        this.checkpointData.order.push(checkpoint.id);
        this.entities[checkpoint.id] = checkpoint;
        this.checkpoints[checkpoint.id] = checkpoint;
        
        for(let i = 1; i < checkpoints.length; i++){
            let checkpoint = new Entity("checkpoint");
            let x = checkpoints[i][0];
            let y = checkpoints[i][1];
            checkpoint.addComponent("visualData", new VisualData("checkpoints", 5, 0, 2, 1, 32, 0))
            checkpoint.addComponent("position", (new Position(x,y)));
            checkpoint.addComponent("automatedAnimation", new AutomatedAnimation(8, 2, 0, 1));
            checkpoint.addComponent("hitbox", new Hitbox([{type: "circle", center: {x: x,y: y}, radius: 120}]));
            checkpoint.visualData.noShow = true;
            this.checkpointData.order.push(checkpoint.id);
            this.entities[checkpoint.id] = checkpoint;
            this.checkpoints[checkpoint.id] = checkpoint;
        }
    }
    createObstacleEntity(obstacleType, x, y){
        let obstacle = new Entity("obstacle");
        //Add position component
        obstacle.addComponent("position", (new Position(x,y)));
        //Add visual data component
        let obstacleTypeData = OBSTACLE_DATA[obstacleType];
        obstacle.addComponent("visualData", (new VisualData("entities", obstacleTypeData.sx, obstacleTypeData.sy, obstacleTypeData.sw, obstacleTypeData.sh, obstacleTypeData.scale, obstacleTypeData.dh)));
        //Add hitbox component
        let entityHitbox = [];
        let obstacleTypeHitbox = obstacleTypeData.hitbox;
        for(let i = 0; i < obstacleTypeHitbox.length; i++){
            let hitboxElement = obstacleTypeHitbox[i];
            if(hitboxElement.type == "circle"){
                entityHitbox.push({type: "circle", center: {x: x,y: y}, radius: hitboxElement.radius});
            }
            if(hitboxElement.type == "line"){
                entityHitbox.push({type: "line", p1: {x: x + hitboxElement.p1.x, y: y + hitboxElement.p1.y}, p2: {x: x + hitboxElement.p2.x, y: y + hitboxElement.p2.y}});
            }
        }
        obstacle.addComponent("hitbox", new Hitbox(entityHitbox));
        
        //Add obstacle spec component
        obstacle.addComponent("obstacleSpecs", new ObstacleSpecs(obstacleType, obstacleTypeData.bounce, obstacleTypeData.hitBehavior));
        
        return obstacle;
    }
    
    applyCommand(command){
        if(command.type == "handleMouseDown"){
            console.log(getTerrainAt(command.data.x,command.data.y))
        }
        if(command.type == "controlsUpdate"){
            let modifier = command.controlModifier
            this.entities[command.carId].carPhysics[modifier[0]] = modifier[1];
        }
    }
    
    getTerrainAt(x,y){
        x = (x + MAP_DATA[this.mapName].width/2)/2;
        y = (y/2 + MAP_DATA[this.mapName].height/2)/2;
        let data = this.mapTerrainData.getImageData(Math.round(x),Math.round(y),1,1).data;
        if(data[3] == 0){
            return "GRASS"
        }
        else if(data[0] == 19 && data[1] == 3 && data[2] == 156){
            return "ROAD"
        }
        else if(data[0] == 255 && data[1] == 107 && data[2] == 0){
            return "DIRT"
        }
        else if(data[0] == 70 && data[1] == 29 && data[2] == 0){
            return "DIRT_ROAD"
        }
        else if(data[0] == 140 && data[1] == 140 && data[2] == 140){
            return "CONCRETE"
        }
        else if(data[0] == 27 && data[1] == 219 && data[2] == 255){
            return "PIT_ROAD"
        }
        else {
            console.log("lol you painted the map wrong idiot");
            return "ROAD";
        }
    }
    
    tick(delta){     
        let entities = this.entities
        for (const key in entities) {   
            if (entities.hasOwnProperty(key)) {
                let entity = entities[key];
                if(entity.hasComponent("automatedAnimation")){
                    entity.automatedAnimation.update(delta);
                }
            }
        }
        if(this.playerCar){
            this.updateCarHitbox(this.playerCar);
            this.updateCarPhysics(delta, this.playerCar);
            this.collideCar(this.playerCar);
            this.checkCheckpoints(this.playerCar);
        }
    }
    
    updateCarPhysics(delta, car){
        let carPhysics = car.carPhysics;
        let carPosition = car.position;
        let carVelocity = carPhysics.velocity;
        let carDirection = carPhysics.direction;
        let carSpeed = carPhysics.velocity.getMagnitude();
        let carTurning = false;
        if(carPhysics.turning != 0) carTurning = true;
        let velocityDirection = (carVelocity.dot(carDirection)) / (carDirection.getMagnitude() ** 2)||1;
        carPhysics.velocityDirection = velocityDirection;
        
        let currentTerrain = this.getTerrainAt(carPosition.x, carPosition.y);
        carPhysics.currentTerrain = currentTerrain;
        let carSpecs = car.carSpecs.clone();
        let angleDifference = carVelocity.angleBetween(carDirection);
        if(velocityDirection >= 0){
            carSpecs.applyModifiers(TERRAIN_MODIFIERS[currentTerrain]);
        }
        else {
            if(carSpeed < 5){
                carSpecs.applyModifiers(
                    [
                    ["grip", "MULTIPLY", 0.05],
                    ["topSpeed", "MULTIPLY", 0],
                    ["topSpeed", "ADD", 5],
                    ]
                )
            }
        }
        
        let accelerationVector;
        if(carPhysics.accelerating == 1 && carSpeed < carSpecs.topSpeed){
            let accelerationMagnitude = carSpecs.accelerationLowSpeed;
            if(carSpeed > car.carSpecs.topSpeed * 0.25){
                accelerationMagnitude = carSpecs.accelerationMidSpeed;
            }
            if(carSpeed > car.carSpecs.topSpeed * 0.75){
                accelerationMagnitude = carSpecs.accelerationHighSpeed;
            }
            accelerationVector = new Vector(carPhysics.direction.x, carPhysics.direction.y);
            accelerationVector.setMagnitude(accelerationMagnitude * delta * 1/10);
        }
        else if(carPhysics.accelerating == -1){
            accelerationVector = new Vector(-carPhysics.direction.x, -carPhysics.direction.y);
            if(velocityDirection > 0){
                accelerationVector.setMagnitude(carSpecs.brakeForce * delta * 1/10);
            }
            else {
                accelerationVector.setMagnitude(carSpecs.reverseAcceleration * delta * 1/10);
            }
        }
        else {
            accelerationVector = new Vector(0, 0);
        }
        if(carPhysics.turning == 1 || carPhysics.turning == -1){
            let turnDirection = carPhysics.turning;
            let turnModifier = 1;
            if(velocityDirection < 0){
                turnModifier *= -1;
            }
            else if(carSpeed < 3){
                turnModifier = carSpeed*0.2;
            }
            else {
                turnModifier -= carSpecs.turnSpeedLossMultiplier * Math.abs(angleDifference);
                if(turnModifier < 0.5){
                    turnModifier = 0.5;
                }
            }
            
            carDirection.setDirection(carDirection.getDirection() + (carSpecs.turnSpeed * 1/200 * delta * turnDirection * turnModifier));
        }
        else {
            let sign = Math.abs(angleDifference)/angleDifference||1;
            
            if (Math.abs(angleDifference) < Math.PI/2 && Math.abs(angleDifference) > 0.01 && velocityDirection > 0 && carVelocity.getMagnitude() > 0.2) {
                carDirection.setDirection(carDirection.getDirection() + sign * 0.1 * Math.abs(angleDifference) * delta);
            }
        }
        
        let carMomentumVector = carVelocity.copy();
        let carDrivingVector = carDirection.copy();
        let gripRatio = (100-(carSpecs.grip - (carSpecs.gripLossSpeedMultiplier/5 * carSpeed) - (carSpecs.gripLossAngleMultiplier/5 * Math.abs(angleDifference))))/100;
        if(gripRatio < 0.2){
            gripRatio = 0.2;
        }
        if(gripRatio > 1){
            gripRatio = 1;
        }
    
        let speedMinusDrag = carSpeed;
        speedMinusDrag -= carSpecs.driftingSpeedLoss/100 * Math.abs(carVelocity.angleBetween(carDirection));
        speedMinusDrag -= carSpecs.straightSpeedLoss/1000;
        if(speedMinusDrag < 0){
            speedMinusDrag = 0;
        }
        if(carSpeed > carSpecs.topSpeed){
            speedMinusDrag -= 1.5 * delta; 
        };
        
        
        carMomentumVector.setMagnitude(speedMinusDrag * gripRatio);
        carDrivingVector.setMagnitude(speedMinusDrag * (1-gripRatio));
        
        carDrivingVector.addTo(accelerationVector);
        
        carVelocity.setMagnitude(0);
        carVelocity.addTo(carDrivingVector);
        carVelocity.addTo(carMomentumVector);
        if(carVelocity.getMagnitude() < 0.1 && carPhysics.accelerating == 0){
            carVelocity.setMagnitude(0);
        }
        
        car.position.x += carPhysics.velocity.x * delta;
        car.position.y += carPhysics.velocity.y * delta;
        
        
        //UPDATE RPM
        let targetRpm = (carSpeed/car.carSpecs.topSpeed)*400;
        
        if(carPhysics.accelerating == 1 && currentTerrain != "PIT_ROAD"){
            targetRpm += 100;
        }
        else if(targetRpm > 50) {
            targetRpm = 50;
        }
        if(currentTerrain == "GRASS" && carPhysics.accelerating == 1){
            targetRpm += 150;
        }
        
        if(carPhysics.rpm + 20 * delta < targetRpm){
            carPhysics.rpm += 20 * delta;
        }
        else if(carPhysics.rpm - 10 * delta > targetRpm){
            carPhysics.rpm -= 10 * delta;
        }
        
        if(carPhysics.rpm > 200 && carSpeed < car.carSpecs.topSpeed * 0.75 && carPhysics.accelerating == 1){
           // car.carPhysics.rpm = 90 + (carSpeed/car.carSpecs.topSpeed)*20;
        }
        
        if(carPhysics.rpm < 0){
            carPhysics.rpm = 0;
        }
        //Update angle offset
        carPhysics.slideAngle = Math.abs(carVelocity.angleBetween(carDirection));
    }

    updateCarHitbox(car){
        let carAngle = car.carPhysics.direction.getDirection();
        let carPosition = car.position;
        let hitboxData = CAR_DATA[car.carSpecs.carBodyName].hitboxData;
        let newHitbox = [];
        
        let offsetVector = new Vector(0, hitboxData.distanceBetweenCircles);
        newHitbox.push({type: "circle", center: {x: carPosition.x, y: carPosition.y}, radius: hitboxData.radius})
        offsetVector.setDirection(carAngle);
        newHitbox.push({type: "circle", center: {x: carPosition.x + offsetVector.x, y: carPosition.y + offsetVector.y}, radius: hitboxData.radius})
        offsetVector.multiplyBy(-1);
        newHitbox.push({type: "circle", center: {x: carPosition.x + offsetVector.x, y: carPosition.y + offsetVector.y}, radius: hitboxData.radius})
        car.hitbox.setHitbox(newHitbox);
    }

    collideCar(car){
        for (const key in this.obstacles) {   
            if (this.obstacles.hasOwnProperty(key)) {
                let obstacle = this.obstacles[key];
                let distance = Math.sqrt(Math.pow(car.position.x - obstacle.position.x,2)+Math.pow(car.position.y - obstacle.position.y,2));
                if(distance < 200){
                    let collisionResult = car.hitbox.collide(obstacle.hitbox);
                    if(collisionResult){
                        let vectorBetween = new Vector(collisionResult[0] - car.position.x, collisionResult[1] - car.position.y);
                        vectorBetween.setMagnitude(CAR_DATA[car.carSpecs.carBodyName].hitboxData.radius + CAR_DATA[car.carSpecs.carBodyName].hitboxData.distanceBetweenCircles + 0.1);
                        car.position.x = collisionResult[0] - vectorBetween.x;
                        car.position.y = collisionResult[1] - vectorBetween.y;
                        
                        let collisionNormal = new Vector(collisionResult[0] - car.position.x, collisionResult[1] - car.position.y);
                        collisionNormal.normalize();
                        let collisionProjection = collisionNormal.multiply(((car.carPhysics.velocity.dot(collisionNormal)) / (collisionNormal.getMagnitude() ** 2)).toFixed(5)*1||1);

                        collisionProjection.multiplyBy(-obstacle.obstacleSpecs.bounce);
                        car.carPhysics.velocity.addTo(collisionProjection);
                    }
                }

            }
        }
    }

    checkCheckpoints(car){
        let checkpoint = this.checkpoints[this.checkpointData.order[this.checkpointData.next]];
        let collisionResult = car.hitbox.collide(checkpoint.hitbox);
        
        let distance = Math.sqrt(Math.pow(car.position.x - checkpoint.position.x,2)+Math.pow(car.position.y - checkpoint.position.y,2));
        if(((distance > this.checkpointData.previousDistanceFromNext || distance < 20) || this.checkpointData.next == 0) && collisionResult != false){
            checkpoint.visualData.noShow = true;
            this.checkpointData.next++;
            if(this.checkpointData.next >= this.checkpointData.order.length){
                this.checkpointData.next = 0;
            }
            this.checkpoints[this.checkpointData.order[this.checkpointData.next]].visualData.noShow = false;
        }
        
        this.checkpointData.previousDistanceFromNext = distance;
    }
















}