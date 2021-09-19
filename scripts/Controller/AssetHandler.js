class AssetHandler {
    constructor(){
        this.images = {};
        this.sounds = {};
    }
    
    //Takes images in form [[image name, image source]...] and adds them to images. Calls callback on finish.
    loadImages(imagesToLoad, callback){
        let imagesLoaded = 0;
        
        for (let i = 0; i < imagesToLoad.length; i++) {
            this.images[imagesToLoad[i][0]] = loadImage(imagesToLoad[i][1]);
        }
        
        function loadImage(url){
            let image = new Image();
            image.addEventListener("load", imageLoaded, false);
            image.src = url;
            return image;
        }
        
        function imageLoaded(){
            imagesLoaded++;
            if (imagesLoaded == imagesToLoad.length){
                callback(this.images);
            }
        }
    }
    
    loadSounds(soundsToLoad, callback){
        let soundsLoaded = 0;
        for(let i = 0; i < soundsToLoad.length; i++){
            loadSound(soundsToLoad[i][1], soundsToLoad[i][0]);
        }
        function loadSound(url, sourceName) {
            // Load buffer asynchronously
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function() {
                // Asynchronously decode the audio file data
                G.audioContext.decodeAudioData(
                    request.response,
                    function(buffer) {
                        if (!buffer) {
                            console.log('error decoding file data: ' + url);
                            return;
                        }
                            soundsLoaded++;
                            G.assetHandler.sounds[sourceName] = buffer;
                            if(soundsLoaded == soundsToLoad.length){
                                callback();
                            }
                    }
                );
            }

            request.onerror = function() {
                console.log('error loading file data: ' + url);
            }

            request.send();
        }
    }

    generateCarImage(id, playerSelection, size, depthOfLayer, directions){
        let amDebugging = false;
        //Get important variables
        let carRef = playerSelection.car;
        let carData = CAR_DATA[playerSelection.car];
        let carImage = this.images[carRef];
        let bodySpriteData = carData.bodySpriteData;
        let decalSpriteData;
        if(playerSelection.decal != "none"){
            decalSpriteData = carData.decals[playerSelection.decal].spriteData;
        }
        let wheelsSpriteData = carData.wheels[playerSelection.wheels].spriteData;
        let spoilerSpriteData;
        if(playerSelection.spoiler != "none"){
            spoilerSpriteData = carData.spoilers[playerSelection.spoiler].spriteData;
        }
        
        //Create body canvas
        let carColor = playerSelection.carColor;
        let trimColor = playerSelection.trimColor;
        let spriteDimensions = carData.spriteDimensions;
        let layerDistance = spriteDimensions.layerDistance/100 * size;
        
        let bodyCanvas = document.createElement('canvas');
        let bodyCtx = bodyCanvas.getContext('2d');
        bodyCanvas.width = spriteDimensions.w * (bodySpriteData.layersTotal+1);
        bodyCanvas.height = spriteDimensions.h;
        bodyCtx.imageSmoothingEnabled = false;
        if(amDebugging){document.body.appendChild(bodyCanvas)};
        bodyCtx.drawImage(
            this.images[carRef], 0, 0, bodyCanvas.width, bodyCanvas.height,
            0, 0, bodyCanvas.width, bodyCanvas.height
        );
        replaceCanvasColors(bodyCanvas, bodyCtx,
            [
                [255, 63, 245, carColor[0][0], carColor[0][1], carColor[0][2]],
                [255, 130, 251, carColor[1][0], carColor[1][1], carColor[1][2]],
                [255, 179, 252, carColor[2][0], carColor[2][1], carColor[2][2]],
                [49, 41, 48, trimColor[0], trimColor[1], trimColor[2]]
            ]
        );
        
        //Create decal canvas
        let decalCanvas;
        let decalCtx;
        if(playerSelection.decal != "none"){
            let decalColor = playerSelection.decalColor;
            
            decalCanvas = document.createElement('canvas');
            decalCtx = decalCanvas.getContext('2d');
            decalCanvas.width = spriteDimensions.w * decalSpriteData.layersTotal;
            decalCanvas.height = spriteDimensions.h;
            decalCanvas.imageSmoothingEnabled = false;
            if(amDebugging){document.body.appendChild(decalCanvas)};
            decalCtx.drawImage(this.images[carRef],
                decalSpriteData.x * spriteDimensions.w, decalSpriteData.y * spriteDimensions.h, decalCanvas.width, decalCanvas.height,
                0, 0, decalCanvas.width, decalCanvas.height
            );
            replaceCanvasColors(decalCanvas, decalCtx,
                [[255, 63, 245, decalColor[0], decalColor[1], decalColor[2]]]
            );
        }
        
        //Create manipulation canvas
        let manipulationCanvas = document.createElement('canvas');
        let manipulationCtx = manipulationCanvas.getContext('2d');
        manipulationCanvas.width = size;
        manipulationCanvas.height = size;
        manipulationCtx.imageSmoothingEnabled = false;
        if(amDebugging){document.body.appendChild(manipulationCanvas)};
        manipulationCanvas.className = "enlarged domSprite";
        
        //Create final canvas
        let finalCanvas = document.createElement('canvas');
        let finalCtx = finalCanvas.getContext('2d');
        finalCanvas.width = size * PlayerData.settings.visual.carDrawDirections;
        finalCanvas.height = size * 3;
        finalCtx.imageSmoothingEnabled = false;
        if(amDebugging){document.body.appendChild(finalCanvas)};
        
        //Actually begin process of drawing
        for(let wc = 0; wc < 3; wc++){
            for(let d = 0; d < directions; d++){
                let angle = d/directions * Math.PI * 2;
                
                manipulationCtx.clearRect(0, 0, size, size);
                manipulationCtx.translate(size/2, size/2);
                manipulationCtx.scale(1, 0.5);
                manipulationCtx.rotate(angle);
                manipulationCtx.translate(-size/2, -size/2);
                
                let reverseVector =  new Vector(1, 0);
                reverseVector.setAngle(-angle - Math.PI/2);
                for(let l = 0; l < 25; l++){
                    if(l == 0){
                        drawShadow(bodyCanvas, bodySpriteData, reverseVector);    
                    }
                    else {
                        drawLayer(bodyCanvas, bodySpriteData, l, reverseVector, true, 0);    
                    }
                    if(playerSelection.decal != "none"){
                      drawLayer(decalCanvas, decalSpriteData, l, reverseVector, true, 0);
                    }
                    drawLayer(carImage, wheelsSpriteData, l, reverseVector, false, wc*spriteDimensions.h);
                    if(playerSelection.spoiler != "none"){
                        drawLayer(carImage, spoilerSpriteData, l, reverseVector, false, 0);
                    }
                }
                finalCtx.drawImage(manipulationCanvas, size * d, size * wc, size, size)
                manipulationCtx.setTransform(1, 0, 0, 1, 0, 0,);
            }
        }
        
        //Save the image and delete all other canvas
        this.images[id] = finalCanvas;
        finalCanvas.remove();
        manipulationCanvas.remove();
        if(playerSelection.decal != "none"){
            decalCanvas.remove();
        }
        bodyCanvas.remove();
        
        //HELPER FUNCTIONS
        function drawLayer(src, spriteData, layer, reverseVector, prerendered, yOffset){
            let drawHeight = layer;
            for(let sl=0; sl < depthOfLayer; sl++){ 
                let ignoreXY = 1;
                if(prerendered == true){
                    ignoreXY = 0;
                }
                if(layer < spriteData.layerStart + spriteData.layersTotal){
                    manipulationCtx.drawImage(src,
                        ((spriteData.x * ignoreXY) + (layer-spriteData.layerStart)) * spriteDimensions.w, spriteData.y * ignoreXY * spriteDimensions.h + yOffset, spriteDimensions.w, spriteDimensions.h,
                        (reverseVector.x * ((layer + (sl/depthOfLayer)) * layerDistance)), (reverseVector.y * ((layer + (sl/depthOfLayer)) * layerDistance)), size, size
                    )
                }
            }
        }
        
        function drawShadow(src, spriteData, reverseVector){
            let tangentVector = reverseVector.copy();
            tangentVector.setDirection(tangentVector.getDirection() + Math.PI/2);
            tangentVector.setMagnitude(size/30);
            
            manipulationCtx.drawImage(src, 0, 0, spriteDimensions.w, spriteDimensions.h, tangentVector.x, tangentVector.y, size, size)
        }
        
        function replaceCanvasColors(targetCanvas, targetCtx, colors){
            var imageData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
            for (var i=0;i<imageData.data.length;i+=4)
              {
                  for (let c = 0; c < colors.length; c++) {
                    let replacement = colors[c];
                    if(imageData.data[i]==replacement[0] &&
                        imageData.data[i+1]==replacement[1] &&
                        imageData.data[i+2]==replacement[2]
                     ){
                        imageData.data[i]=replacement[3];
                        imageData.data[i+1]=replacement[4];
                        imageData.data[i+2]=replacement[5];
                     }
                  }
              }
            targetCtx.putImageData(imageData,0,0);
        } 
    }
    
    unloadImages(names){
        for(let i=0; i < names.length; i++){
            if(this.images[names[i]]){
                delete this.images[names[i]]
            }
        }
    }
    
    getImages(){
        return this.images;
    }
}
