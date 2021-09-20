class OutputStream {
    constructor(){
        this.listeners = {};
    }
    
    addListener(id, eventType, callback){
        this.listeners[id] = {eventType: eventType, callback: callback};
    }
    
    deleteListener(id){
        delete this.listeners[id];
    }
    
    reportEvent(eventType, data){
        for (const key in this.listeners) {   
            if (this.listeners.hasOwnProperty(key)) {
                let listener = this.listeners[key];
                if(listener.eventType == eventType){
                    listener.callback(data);
                }
            }
        }
    }
}