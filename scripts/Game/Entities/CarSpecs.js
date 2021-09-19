class CarSpecs {
    constructor(car){
        this.carBodyName = car;
        let carData = CAR_DATA[car].stats
        for (const key in carData) {   
            if (carData.hasOwnProperty(key)) {
                this[key] = JSON.parse(JSON.stringify(carData[key]));
            }
        }
    }
    
    applyModifiers(modifiers){
        for(let i = 0; i < modifiers.length; i++){
            let modifier = modifiers[i];
            if(modifier[1] == "ADD"){
                this[modifier[0]] += modifier[2];
            }
            if(modifier[1] == "SUBTRACT"){
                this[modifier[0]] -= modifier[2];
            }
            if(modifier[1] == "MULTIPLY"){
                this[modifier[0]] *= modifier[2];
            }
            if(modifier[1] == "DIVIDE"){
                this[modifier[0]] /= modifier[2];
            }
        }
    }
    
    clone(){
        let newCarSpecs = new CarSpecs(this.carBodyName);
        for (const key in this) {   
            if (this.hasOwnProperty(key)) {
                newCarSpecs[key] = JSON.parse(JSON.stringify(this[key]));
            }
        }
        return newCarSpecs;
    }
}