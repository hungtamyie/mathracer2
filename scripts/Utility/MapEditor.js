class MapEditor{
    constructor(){
        this.game = G.gameController.game;
        this.currentObstacle = "treeA";
        this.state = "placing";
        this.entitiesPlaced = [];
        for (const key in OBSTACLE_DATA) {   
            if (OBSTACLE_DATA.hasOwnProperty(key)) {
                editorTools.innerHTML += "<button onclick='G.mapEditor.changeObstacle(\"" + key + "\")'>" + key +"</button>"
            }
        }
         editorTools.innerHTML += "<button onclick='G.mapEditor.undoObstacle()' style='background: green; color: white'>Undo</button>";
         editorTools.innerHTML += "<button onclick='G.mapEditor.saveObstacles()' style='background: green; color: white'>Save</button>"
         editorTools.innerHTML += "<button onclick='G.mapEditor.movingObstacle()' style='background: green; color: white'>Move</button>"
         editorTools.innerHTML += "<button onclick='G.mapEditor.deletingObstacles()' style='background: green; color: white'>Delete</button>"
         editorTools.style.display = "block"
    }
    
    changeObstacle(obstacle){
        this.state = "placing";
        this.currentObstacle = obstacle;
    }
    
    undoObstacle(){
        if(this.entitiesPlaced.length > 0){
            let lastPlacedId = this.entitiesPlaced[this.entitiesPlaced.length-1];
            this.deleteObstacleById(lastPlacedId)
            this.entitiesPlaced.pop()
        }
    }
    
    deleteObstacleById(id){
        G.gameController.renderer.domSprites["domSprite_" + id].deleteSprite();
        delete this.game.obstacles[id];
        delete this.game.entities[id];
    }
    
    movingObstacle(){
        this.state = "moving";
    }
    
    mouseClicked(x, y){
        let newObstacle = this.game.createObstacleEntity(this.currentObstacle, x, y);
        if(this.state == "placing"){
            this.game.entities[newObstacle.id] = newObstacle;
            this.game.obstacles[newObstacle.id] = newObstacle;
            this.entitiesPlaced.push(newObstacle.id);
            
            if(this.currentObstacle == "pitStopFront"){
                this.currentObstacle = "pitStopBack";
                this.mouseClicked(x,y-50);
            }
        }
        if(this.state == "moving"){
            if(this.entitiesPlaced.length > 0){
                let lastPlacedId = this.entitiesPlaced[this.entitiesPlaced.length-1];
                this.game.obstacles[lastPlacedId].position.x = x;
                this.game.obstacles[lastPlacedId].position.y = y;
                
                if(this.currentObstacle == "pitStopBack"){
                    this.game.obstacles[this.entitiesPlaced[this.entitiesPlaced.length-2]].position.x = x;
                    this.game.obstacles[this.entitiesPlaced[this.entitiesPlaced.length-2]].position.y = y+50;
                }
            }
        }
        if(this.state == "deleting"){
            let hitbox = new Hitbox([{type: "circle", center: {x: x, y: y}, radius: 20}]);
            for (const key in this.game.obstacles) {   
                if (this.game.obstacles.hasOwnProperty(key)) {
                    let obstacle = this.game.obstacles[key];
                    let otherHitbox = new Hitbox([{type: "circle", center: {x: obstacle.position.x, y: obstacle.position.y}, radius: 10}])
                    if(otherHitbox.collide(hitbox)){
                        this.deleteObstacleById(obstacle.id);
                    }
                }
            }
        }
    }
    
    deletingObstacles(){
        this.state = "deleting"
    }
    
    saveObstacles(){
        let game = this.game;
        let finalObj = [];
        for (const key in game.obstacles) {   
            if (game.obstacles.hasOwnProperty(key)) {
                let obstacle = game.obstacles[key];
                finalObj.push([obstacle.obstacleSpecs.obstacleType, roundNumber(obstacle.position.x,2), roundNumber(obstacle.position.y,2)])
            }
        }
        this.downloadObjectAsJson(finalObj);
    }
    
    downloadObjectAsJson(exportObj, exportName){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}