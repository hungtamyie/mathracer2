//Handles the game, whether it is an online match or training match.
class GameController {
    constructor(gameType){
         this.game;
         this.renderer;
         
         this.myCarId;
         this.myInputs = {
            drive: false,
            brake: false,
            left: false,
            right: false,
            traction: false,
        };
         
         this.lastTickTimestamp;
         this.paused = true;
    }
    
    createNewGame(map){
        let mapTerrainData = this.createMapTerrainData(map);
        this.game = new Game(map, mapTerrainData);
        this.renderer = new Renderer(this.game, G.screen);
        this.renderer.render();
    }
    
    joinAsRacer(){
        this.addMyCar();
    }
    
    addMyCar(){
        let myCarPreset = PlayerData.carPresets[PlayerData.chosenPreset];
        let id = "E_" + makeId(10);
        this.myCarId = id;
        G.assetHandler.generateCarImage(
            ("sprite_" + id),
            {
                car: myCarPreset.car,
                wheels: myCarPreset.wheels,
                decal: myCarPreset.decal,
                spoiler: myCarPreset.spoiler,
                carColor: myCarPreset.carColor,
                trimColor: myCarPreset.trimColor,
                decalColor: myCarPreset.decalColor,
            },
            CAR_DATA[myCarPreset.car].spriteDimensions.drawSize,
            PlayerData.settings.visual.carDrawDepth,
            PlayerData.settings.visual.carDrawDirections
        );
        G.soundEngine.addCarSoundHandler(id, myCarPreset.car);
        this.game.loadInCar(id, myCarPreset, false);
    }
    
    receiveInput(type, data){
        if(type == "mousedown"){
            let realXY = this.renderer.reverseCameraMatrix(data.x, data.y);
            console.log(realXY[0]);
            console.log(realXY[1]);
            realXY[1] = realXY[1] * 2;
            console.log(this.game.getTerrainAt(realXY[0], realXY[1]));
            if(G.mapEditor){
                G.mapEditor.mouseClicked(realXY[0], realXY[1])
            }
        }
        if(type == "keydown" || type == "keyup"){
            if(this.myCarId){
                let isKeyDown = true;
                if(type == "keyup") isKeyDown = false;
                let myCar = this.game.entities[this.myCarId];
                let keyBinds = PlayerData.settings.keybinds;
                let validInput = false;
                if(data == keyBinds.left || data=="arrowleft") {this.myInputs.left = isKeyDown; validInput = true;}
                if(data == keyBinds.right || data=="arrowright") {this.myInputs.right = isKeyDown; validInput = true;}
                if(data == keyBinds.drive || data=="arrowup") {this.myInputs.drive = isKeyDown; validInput = true;}
                if(data == keyBinds.brake || data=="arrowdown") {this.myInputs.brake = isKeyDown; validInput = true;}
                if(data == keyBinds.traction) {this.myInputs.traction = isKeyDown; validInput = true;}
                
                if(validInput){
                    if     (this.myInputs.left && !this.myInputs.right)  this.sendControlUpdate(["turning", -1]);
                    else if(this.myInputs.right && !this.myInputs.left)  this.sendControlUpdate(["turning", 1]);
                    else                                                 this.sendControlUpdate(["turning", 0]);
                    
                    if     (this.myInputs.drive && !this.myInputs.brake) this.sendControlUpdate(["accelerating", 1]);
                    else if(this.myInputs.brake && !this.myInputs.drive) this.sendControlUpdate(["accelerating", -1]);
                    else                                                 this.sendControlUpdate(["accelerating", 0]);
                    
                    if(this.myInputs.traction)                           this.sendControlUpdate(["tractionControl", true]);
                    else                                                 this.sendControlUpdate(["tractionControl", false]);
                }
                
                if(this.type == "keydown" && data == keyBinds.boost) this.game.applyCommand({type: "boostActivation", carId: this.myCarId});
            }
            if(G.mapEditor){
                if(type == "keydown"){
                    if(data == "["){
                        this.renderer.camera.zoom -= 0.2;
                    }
                    if(data == "]"){
                        this.renderer.camera.zoom += 0.2;
                    }
                    if(data == "arrowleft"){
                        this.renderer.camera.x -= 20;
                    }
                    if(data == "arrowright"){
                        this.renderer.camera.x += 20;
                    }
                    if(data == "arrowup"){
                        this.renderer.camera.y -= 20;
                    }
                    if(data == "arrowdown"){
                        this.renderer.camera.y += 20;
                    }
                }
            }
        }
    }
    
    sendControlUpdate(modifier){
        this.game.applyCommand({type: "controlsUpdate", carId: this.myCarId, controlModifier: modifier});
    }
    
    createMapTerrainData(map){
        let mapTerrainDataImage = G.assetHandler.images[map+"_data"];
        let mapTerrainDataCanvas = document.createElement("canvas");
        let mapTerrainDataCtx = mapTerrainDataCanvas.getContext("2d");
        mapTerrainDataCanvas.width = mapTerrainDataImage.width;
        mapTerrainDataCanvas.height = mapTerrainDataImage.height;
        mapTerrainDataCtx.drawImage(mapTerrainDataImage, 0, 0, mapTerrainDataCanvas.width, mapTerrainDataCanvas.height);
        return mapTerrainDataCtx;
    }
    
    start(){
        this.unpause();
    }
    
    tick(){
        let currentTickTimestamp = Date.now();
        let delta = currentTickTimestamp - this.lastTickTimestamp;
        let fpsInterval = 1000/PlayerData.settings.visual.fps;
        if(!this.paused){
            //if(delta > fpsInterval && document.hasFocus()){
            if(delta > fpsInterval){
                delta = delta/60;
                if(delta > 3){
                    delta = 3;
                }
                this.game.tick(delta);
                if(this.myCarId){
                    this.renderer.trackCarWithCamera(delta, this.myCarId);
                    G.soundEngine.updateCarSound(this.myCarId, this.game.entities[this.myCarId]);
                }
                this.renderer.render();
                G.gameUIHandler.update();
                this.lastTickTimestamp = currentTickTimestamp// - (delta % fpsInterval);
            }
            window.requestAnimationFrame(this.tick.bind(this));
        }
    }
    
    pause(){
        this.paused = true;
    }
    
    unpause(){
        this.lastTickTimestamp = Date.now();
        this.paused = false;
        this.tick();
    }
    
    
}