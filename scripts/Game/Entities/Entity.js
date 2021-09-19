class Entity {
    constructor(type, id){
        this.type = type;
        if(typeof(myVariable) != "undefined"){
            this.id = id;
        }
        else {
            this.id = "E_" + makeId(10);
        }
    }
    
    addComponent(componentType, component){
        this[componentType] = component;
    }
    
    hasComponent(c){
        if(typeof(this[c]) != "undefined"){
            return true;
        }
        else {
            return false;
        }
    }
    
    getComponent(c){
        return this[c];
    }
}