class InputHandler{
    constructor(){
        this.listeners = [];
        
        let self = this;
        document.getElementById("gameScreen").onmousedown = function(e){
            let eventType = "mousedown";
            let data = {x: e.clientX, y: e.clientY};
            self.alertListeners(eventType, data);
        }
        
        window.onkeydown = function(e){
            let eventType = "keydown";
            let data = e.key.toLowerCase();
            self.alertListeners(eventType, data);
        }
        
        window.onkeyup = function(e){
            let eventType = "keyup";
            let data = e.key.toLowerCase();
            self.alertListeners(eventType, data);
        }
    }
    
    addListener(listener){
        this.listeners.push(listener);
    }
    
    alertListeners(eventType, data){
        for(let i = 0; i < this.listeners.length; i++){
            let listener = this.listeners[i];
            listener.receiveInput(eventType, data);
        }
    }
    
    log(msg){
        console.log(msg);
    }
}