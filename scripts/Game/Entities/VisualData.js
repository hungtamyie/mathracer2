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
        
        this.zIndex = 0;
        this.filters = [];
        this.noShow = false;
        this.isAffectedByCamera = true;
    }
}