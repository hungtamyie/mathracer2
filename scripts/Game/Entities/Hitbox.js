class Hitbox {
    constructor(hitboxArray){
        this.hitboxes = [];
        if(hitboxArray){
            for(let i = 0; i < hitboxArray.length; i++){
                let hitbox = hitboxArray[i];
                if(hitbox.type == "circle"){
                    this.hitboxes.push({type: "circle", center: {x: hitbox.center.x, y: hitbox.center.y}, radius: hitbox.radius});
                }
                if(hitbox.type == "line"){
                    this.hitboxes.push({type: "line", p1: {x: hitbox.p1.x, y: hitbox.p1.y}, p2: {x: hitbox.p2.x, y: hitbox.p2.y}});
                }
            }
        }
    }
    
    setHitbox(hitbox){
        this.hitboxes = hitbox;
    }
    
    collide(otherHitboxes){
        for(let a = 0; a < otherHitboxes.hitboxes.length; a++){
            let hitboxA = otherHitboxes.hitboxes[a];
            for(let b = 0; b < this.hitboxes.length; b++){
                let hitboxB = this.hitboxes[b];
                if(hitboxA.type == "circle" && hitboxB.type == "circle"){
                    let collisionTest = this.collideCircleWithCircle(hitboxA, hitboxB)
                    if(collisionTest){
                        return collisionTest;
                    }
                }
                else if(hitboxA.type == "circle" && hitboxB.type == "line"){
                    let collisionTest = this.collideLineWithCircle(hitboxB, hitboxA)
                    if(collisionTest){
                        return collisionTest;
                    }
                }
                else if(hitboxA.type == "line" && hitboxB.type == "circle"){
                    let collisionTest = this.collideLineWithCircle(hitboxA, hitboxB)
                    if(collisionTest){
                        return collisionTest;
                    }
                }
                else {
                    console.log("I THOUGHT THIS WASNT SUPPOSED TO HAPPEN D:")
                    return false;
                }
            }
        }
        return false;
    }
    
    collideCircleWithCircle(circleA, circleB){
        let distance = Math.sqrt(Math.pow(circleA.center.x - circleB.center.x,2) + Math.pow(circleA.center.y - circleB.center.y,2));
        if(distance < circleA.radius + circleB.radius){
            return [circleA.center.x + (circleB.center.x - circleA.center.x)/distance * circleA.radius, circleA.center.y + (circleB.center.y - circleA.center.y)/distance * circleA.radius]
        }
        return false;
    }
    
    collideLineWithCircle(line, circle){
        var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
        v1 = {};
        v2 = {};
        v1.x = line.p2.x - line.p1.x;
        v1.y = line.p2.y - line.p1.y;
        v2.x = line.p1.x - circle.center.x;
        v2.y = line.p1.y - circle.center.y;
        b = (v1.x * v2.x + v1.y * v2.y);
        c = 2 * (v1.x * v1.x + v1.y * v1.y);
        b *= -2;
        d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if(isNaN(d)){ // no intercept
            return false;
        }
        u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
        u2 = (b + d) / c;    
        retP1 = {};   // return points
        retP2 = {}  
        ret = []; // return array
        if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
            retP1.x = line.p1.x + v1.x * u1;
            retP1.y = line.p1.y + v1.y * u1;
            ret[0] = retP1;
        }
        if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
            retP2.x = line.p1.x + v1.x * u2;
            retP2.y = line.p1.y + v1.y * u2;
            ret[ret.length] = retP2;
        }
        if(Math.sqrt(Math.pow(line.p1.x-circle.center.x,2) + Math.pow(line.p1.y-circle.center.y,2)) < circle.radius){
            return [line.p1.x, line.p1.y]
        }
        if(Math.sqrt(Math.pow(line.p2.x-circle.center.x,2) + Math.pow(line.p2.y-circle.center.y,2)) < circle.radius){
            return [line.p2.x, line.p2.y]
        }
        
        if(ret.length == 0){
            return false;
        }
        return [ret[0].x, ret[0].y];
    }
}