class DomSprite{
    constructor(image){
        this.sprite = document.createElement("canvas");
        this.sprite.className = "domSprite";
        this.spriteCtx = this.sprite.getContext("2d");
        this.spriteCtx.imageSmoothingEnabled = false;
        this.image = image;
    }
    appendSprite(screen){
        screen.appendChild(this.sprite);
    }
    updateDrawing(sx, sy, sw, sh, scale){
        if(!scale){
            scale = 1;
        }
        this.sprite.width = sw * scale;
        this.sprite.height = sh * scale;
        this.spriteCtx.mozImageSmoothingEnabled = false;
        this.spriteCtx.webkitImageSmoothingEnabled = false;
        this.spriteCtx.msImageSmoothingEnabled = false;
        this.spriteCtx.imageSmoothingEnabled = false;
        this.spriteCtx.drawImage(this.image, sx * scale, sy * scale, sw * scale, sh * scale, 0, 0, sw * scale, sh * scale);
    }
    updatePosition(dx, dy, dw, dh){
        this.sprite.style.left =    dx + "px";
        this.sprite.style.top =     dy + "px";
        this.sprite.style.width =   dw + "px";
        this.sprite.style.height =  dh + "px";
    }
    updateZIndex(z){
        this.sprite.style.zIndex = Math.floor(z);
    }
    hide(){
        this.sprite.style.display = "none";
    }
    show(){
        this.sprite.style.display = "block";
    }
    setOpacity(opacity){
        this.sprite.style.opacity = opacity;
    }
    deleteSprite(){
        this.sprite.remove();
    }
}