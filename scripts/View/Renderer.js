class Renderer {
    constructor(game, screen){
        this.game = game;
        this.screen = screen;
        this.camera = {
            x: -400,
            y: -300,
            zoom: 1,
        };
        this.domSprites = {};
        this.particles = [];
        this.hitboxDebugger = false;
        if(this.hitboxDebugger == true){
            this.hitboxCanvas = document.createElement("canvas");
            this.hitboxCtx = this.hitboxCanvas.getContext("2d");
            this.hitboxCanvas.width = window.innerWidth;
            this.hitboxCanvas.height = window.innerHeight;
            this.hitboxCanvas.className = "hitboxCanvas";
            document.body.appendChild(this.hitboxCanvas);
        }
    }
    
    render(){
        let entities = this.game.entities;
        if(this.hitboxDebugger){
            this.hitboxCtx.clearRect(0,0,this.hitboxCanvas.width, this.hitboxCanvas.height);
        }
        for (var key in entities) {
            if (entities.hasOwnProperty(key)) {
                let entity = entities[key];
                if(entity.hasComponent("visualData")){
                    let entityVisualData = entity.getComponent("visualData");
                    let entityPosition = entity.getComponent("position");
    
                    //If there is already a dom sprite, update its position. If not, create a new one.
                    if(typeof(this.domSprites["domSprite_" + entity.id]) == 'undefined'){
                        let image = G.assetHandler.images[entityVisualData.spriteRef];
                        if(!image){break};
                        let newDomSprite = new DomSprite(image);
                        newDomSprite.updateDrawing(entityVisualData.sx, entityVisualData.sy, entityVisualData.sw, entityVisualData.sh, entityVisualData.scale);
                        newDomSprite.appendSprite(this.screen);
                        this.domSprites["domSprite_" + entity.id] = newDomSprite;
                        this.updateEntityPosition(entity);
                    }
                    else {
                        //If no show dont show ez
                        if(entityVisualData.noShow == true){
                            this.domSprites["domSprite_" + entity.id].hide();
                            continue;
                        }
                        else {
                             this.domSprites["domSprite_" + entity.id].show();
                        }
                        
                        this.updateEntityPosition(entity);
                        if(entity.hasComponent("automatedAnimation") && entityVisualData.noShow == false){
                            let automatedAnimation = entity.automatedAnimation;
                            this.domSprites["domSprite_" + entity.id].updateDrawing(
                                entityVisualData.sx + automatedAnimation.frameOffsetX * automatedAnimation.currentFrame,
                                entityVisualData.sy + automatedAnimation.frameOffsetY * automatedAnimation.currentFrame,
                                entityVisualData.sw, entityVisualData.sh, entityVisualData.scale);
                        }
                        if(entity.type == "car"){
                            let carDirection = entity.carPhysics.direction.copy();
                            carDirection.setDirection(carDirection.getDirection() - Math.PI/2);
                            let turnPercentage = ((carDirection.getDirection() + Math.PI) * (180/Math.PI))/360;
                            let frame = Math.floor(turnPercentage * PlayerData.settings.visual.carDrawDirections);
                            let carSourceSize = CAR_DATA[entity.carSpecs.carBodyName].spriteDimensions.drawSize;
                            let wheelModifier = 0;
                            if(entity.carPhysics.turning == 1){
                                wheelModifier = 1;
                            }
                            else if(entity.carPhysics.turning == -1){
                                wheelModifier = 2;
                            }
                            this.domSprites["domSprite_" + entity.id].updateDrawing(frame, wheelModifier, 1, 1, carSourceSize);
                        }
                    }
                }
                if(entity.hasComponent("hitbox") && this.hitboxDebugger){
                    this.hitboxCtx.lineWidth = 3;
                    this.hitboxCtx.strokeStyle = "red";
                    let entityHitbox = entity.getComponent("hitbox").hitboxes;
                    for(let i = 0; i < entityHitbox.length; i++){
                        let hitboxElement = entityHitbox[i];
                        if(hitboxElement.type == "circle"){
                            let drawPos = this.cameraMatrix(hitboxElement.center.x-hitboxElement.radius, hitboxElement.center.y/2-hitboxElement.radius/2, hitboxElement.radius*2, hitboxElement.radius);
                            //let drawPos = this.cameraMatrix(hitboxElement.center.x, hitboxElement.center.y/2, hitboxElement.radius, hitboxElement.radius);
                            drawEllipse(this.hitboxCtx, drawPos[0],drawPos[1],drawPos[2],drawPos[3]);
                            //this.hitboxCtx.beginPath();
                            //this.hitboxCtx.arc(drawPos[0], drawPos[1],drawPos[2], 0, Math.PI*2, false);
                            //this.hitboxCtx.stroke();
                        }
                        if(hitboxElement.type == "line"){
                            let p1 = this.cameraMatrix(hitboxElement.p1.x, (hitboxElement.p1.y)/2, 0, 0);
                            let p2 = this.cameraMatrix(hitboxElement.p2.x, (hitboxElement.p2.y)/2, 0, 0);
                            this.hitboxCtx.beginPath();
                            this.hitboxCtx.moveTo(p1[0], p1[1]);
                            this.hitboxCtx.lineTo(p2[0], p2[1]);
                            this.hitboxCtx.stroke();
                        }
                    }
                    function drawEllipse(ctx, x, y, w, h) {
                        var kappa = .5522848,
                            ox = (w / 2) * kappa, // control point offset horizontal
                            oy = (h / 2) * kappa, // control point offset vertical
                            xe = x + w,           // x-end
                            ye = y + h,           // y-end
                            xm = x + w / 2,       // x-middle
                            ym = y + h / 2;       // y-middle
                        
                        ctx.beginPath();
                        ctx.moveTo(x, ym);
                        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                        //ctx.closePath(); // not used correctly, see comments (use to close off open path)
                        ctx.stroke();
                    }
                }
            }
        }
    
    }
    
    trackCarWithCamera(delta, carId){
        let car = this.game.entities[carId]
        let normalizedVelocity = car.carPhysics.velocity.copy();
        normalizedVelocity.normalize()
        let carSpeed = car.carPhysics.velocity.getMagnitude();
        let targetX = car.position.x + normalizedVelocity.x*PlayerData.settings.camera.distanceInFront*carSpeed/10;
        let targetY = (car.position.y + normalizedVelocity.y*PlayerData.settings.camera.distanceInFront*carSpeed/10)/2;
        
        /*let originalCameraX = this.camera.x;
        let originalCameraY = this.camera.y;
        let originalCameraZoom = this.camera.zoom;*/
        this.camera.y += ((targetY - this.camera.y)/PlayerData.settings.camera.stiffness) * delta;
        this.camera.x += ((targetX - this.camera.x)/PlayerData.settings.camera.stiffness) * delta;
        
        let targetZoom = 2.2 - carSpeed/30;
        this.camera.zoom += (targetZoom - this.camera.zoom)/PlayerData.settings.camera.stiffness;
        
        /*let mapWidth = MAP_DATA[this.game.mapName].width;
        let mapHeight = MAP_DATA[this.game.mapName].height;
        let topLeft = this.cameraMatrix(-mapWidth/2,-mapHeight/2,0,0);
        if(topLeft[0] > 0){
            this.camera.x = originalCameraX;
            this.camera.zoom = originalCameraZoom;
        }
        if(topLeft[1] > 0){
            this.camera.y = originalCameraY;
            this.camera.zoom = originalCameraZoom;
        }*/
    }
    
    updateEntityPosition(entity){
        let domSprite = this.domSprites["domSprite_" + entity.id];
        let entityVisualData = entity.getComponent("visualData");
        let dxOffset = 0;
        let dyOffset = 0;
        let dwOffset = 0;
        let dhOffset = 0;
        for(let i = 0; i < entityVisualData.filters.length; i++){
            let filter = entityVisualData.filters[i];
            if(filter.type == "opacity"){
                this.domSprites["domSprite_" + entity.id].setOpacity(filter.value);
            }
            if(filter.type == "squash"){
                    dxOffset = (Math.abs(Math.cos(filter.value)) * filter.movementAmount*filter.value/5 - Math.abs(Math.sin(filter.value)) * filter.movementAmount*filter.value/5)/-2;
                    dwOffset = Math.abs(Math.cos(filter.value)) * filter.movementAmount*filter.value/5 - Math.abs(Math.sin(filter.value)) * filter.movementAmount*filter.value/5;

                    dyOffset = (Math.abs(Math.sin(filter.value)) * filter.movementAmount*filter.value/5 - Math.abs(Math.cos(filter.value)) * filter.movementAmount*filter.value/5)/-1.5;
                    dhOffset = Math.abs(Math.sin(filter.value)) * filter.movementAmount*filter.value/5 - Math.abs(Math.cos(filter.value)) * filter.movementAmount*filter.value/5
            }
            if(filter.type == "shake"){
                dxOffset = (Math.abs(Math.cos(filter.value)) * filter.movementAmount*filter.value/5 - Math.abs(Math.sin(filter.value)) * filter.movementAmount*filter.value/5)/-2;
            }
        }
        
        let entityWidth = (entityVisualData.sw * entityVisualData.scale);
        let entityHeight = (entityVisualData.sh * entityVisualData.scale);
        
        let dx = entity.position.x + dxOffset - entityWidth/2;
        let dy = entity.position.y/2 + dyOffset - entityHeight/2 + entityVisualData.dh;
        let dw = entityWidth + dwOffset;
        let dh = entityHeight + dhOffset;
        let m = this.cameraMatrix(dx, dy, dw, dh);
        domSprite.updatePosition(m[0], m[1], m[2], m[3]);
        if(entity.type == "background"){
            domSprite.updateZIndex(-10000);
        }
        else {
            if(entityVisualData.forceZIndex != false){
                domSprite.updateZIndex(entityVisualData.forceZIndex);
            }
            else {
                domSprite.updateZIndex(Math.round(entity.position.y/2));
            }
        }
    }
    
    //Takes a position where a sprite will be drawn and changes it based on where the camera is
    cameraMatrix(x,y,w,h){
        let nx = ((x - this.camera.x) * this.camera.zoom) * G.S + window.innerWidth/2;
        let ny = ((y - this.camera.y) * this.camera.zoom) * G.S + window.innerHeight/2;
        let nw = (w * this.camera.zoom) * G.S;
        let nh = (h * this.camera.zoom) * G.S;
        return [nx,ny,nw,nh];
    }

    //Takes an pixel from the screen and figures out where the real x and y coordinates are
    reverseCameraMatrix(x,y){
        let nx = (((x - window.innerWidth/2)/G.S)/this.camera.zoom)+this.camera.x;
        let ny = ((((y - window.innerHeight/2)/G.S)/this.camera.zoom)+this.camera.y);
        
        return [nx, ny];
    }
}