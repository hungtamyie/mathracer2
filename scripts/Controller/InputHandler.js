class InputHandler{
    constructor(){
        this.listeners = {};
        this.gameListenerId = undefined;
        this.outputStream = new OutputStream();
        
        let self = this;
        document.getElementById("gameScreen").onmousedown = function(e){
            let eventType = "mousedown";
            let data = {x: e.clientX, y: e.clientY};
            self.outputStream.reportEvent(eventType, data);
        }
        
        window.onkeydown = function(e){
            let eventType = "keydown";
            let data = e.key.toLowerCase();
            self.outputStream.reportEvent(eventType, data);
        }
        
        window.onkeyup = function(e){
            let eventType = "keyup";
            let data = e.key.toLowerCase();
            self.outputStream.reportEvent(eventType, data);
        }
    }
    
    addListener(id, eventType, callback){
        this.outputStream.addListener(id, eventType, callback);
    }
    
    coupleToGameController(gameController){
        let listenerId = "listen_" + makeId(10);
        this.addListener(listenerId, "ANY", function(eventType, data){gameController.receiveInput(eventType, data)});
    }
    
    log(msg){
        console.log(msg);
    }
}