class VisualData {
    constructor(spriteRef, sx, sy, sw, sh, scale, dh){
        this.spriteRef = spriteRef;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        if(typeof scale == "undefined"){
            this.scale = 1;
        }
        else {
            this.scale = scale;
        }
        this.dh = dh;
        if(typeof dh == "undefined"){
            this.dh = 0;
        }
        
        this.forceZIndex = false;
        this.filters = [];
        this.noShow = false;
        this.isAffectedByCamera = true;
    }
    addFilter(filter){
        this.filters.push(filter);
    }
    updateFilters(delta){
        for(let i = this.filters.length-1; i >= 0; i--){
            let filter = this.filters[i];
            if(filter.type == "opacity"){
                filter.value += filter.changeRate * delta;
                if(filter.value < 0){
                    filter.value = 0;
                }
                if(filter.value > 1){
                    filter.value = 1;
                }
            }
            if(filter.type == "squash" || filter.type == "shake"){
                filter.value -= filter.changeRate * delta;
                if(filter.value < 0){
                    this.filters.splice(i, 1);
                }
            }
        }
    }
}

//FILTER TYPES
//Opacity, value, change rate
//Squash, value, change rate, movementAmount