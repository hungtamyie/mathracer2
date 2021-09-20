class SoundEngine {
    constructor(game){
        this.game = game;
        this.carSoundHandlers = {};
        
    }
    
    addCarSoundHandler(id, carType){
        this.carSoundHandlers[id] = new CarSoundHandler(carType);
    }
    
    updateCarSound(id, car){
        let carSoundHandler = this.carSoundHandlers[id];
        
        let carPhysics = car.carPhysics;
        let currentTerrain = carPhysics.currentTerrain;
        let velocityDirection = carPhysics.velocityDirection;
        let carSpeed = carPhysics.velocity.getMagnitude();
        
        carSoundHandler.playSoundByRpm(carPhysics.rpm);
        let slideVolume = carPhysics.slideAngle;
        if(currentTerrain == "DIRT" && (carSpeed > 1 || carPhysics.accelerating == 1)){
            carSoundHandler.playSlideSoundBySlide(0.4);
            carSoundHandler.playSquealSoundBySlide(0);
        }
        else {
            if(carPhysics.slideAngle > 1){
                slideVolume = 1;
            }
            if(carPhysics.slideAngle < 0.3 || velocityDirection < 0){
                slideVolume = 0;
                carSoundHandler.playSlideSoundBySlide(0);
                carSoundHandler.playSquealSoundBySlide(0);
            }
            else if(currentTerrain == "ROAD" || currentTerrain == "PIT_ROAD" || currentTerrain == "CONCRETE") {
                carSoundHandler.playSquealSoundBySlide(((slideVolume-0.3)/2)* carSpeed/car.carSpecs.topSpeed);
                carSoundHandler.playSlideSoundBySlide(0);
            }
            else {
                carSoundHandler.playSlideSoundBySlide(0);
                carSoundHandler.playSquealSoundBySlide(0);
            }
        }
    }
}

class CarSoundHandler {
    constructor(carType){
        this.idleSound = G.audioContext.createBufferSource();
        this.idleSound.buffer = G.assetHandler.sounds[carType + '_idle'];
        this.idleSoundGain = G.audioContext.createGain();
        this.idleSound.connect(this.idleSoundGain).connect(G.audioContext.destination);
        this.idleSound.loop = true;
        this.idleSoundGain.gain.value = 0;
        this.idleSound.start(0);
        
        this.lowRpmSound = G.audioContext.createBufferSource();
        this.lowRpmSound.buffer = G.assetHandler.sounds[carType + '_100rpm'];
        this.lowRpmSoundGain = G.audioContext.createGain();
        this.lowRpmSound.connect(this.lowRpmSoundGain).connect(G.audioContext.destination);
        this.lowRpmSound.loop = true;
        this.lowRpmSoundGain.gain.value = 0;
        this.lowRpmSound.start(0);
        
        this.squealSound = G.audioContext.createBufferSource();
        this.squealSound.buffer = G.assetHandler.sounds['squeal_loop'];
        this.squealSoundGain = G.audioContext.createGain();
        this.squealSound.connect(this.squealSoundGain).connect(G.audioContext.destination);
        this.squealSound.loop = true;
        this.squealSoundGain.gain.value = 0;
        this.squealSound.start(0);
        
        this.slideSound = G.audioContext.createBufferSource();
        this.slideSound.buffer = G.assetHandler.sounds['slide_loop'];
        this.slideSoundGain = G.audioContext.createGain();
        this.slideSound.connect(this.slideSoundGain).connect(G.audioContext.destination);
        this.slideSound.loop = true;
        this.slideSoundGain.gain.value = 0;
        this.slideSound.start(0);
    }
    
    playSoundByRpm(rpm){
        this.idleSoundGain.gain.value = 0;
        this.lowRpmSoundGain.gain.value = 0;
        rpm = Math.round(rpm);
        if(rpm <= 50){
            this.idleSoundGain.gain.value = Math.floor(Math.sqrt(1-(rpm/50))*100)/100;
            this.lowRpmSoundGain.gain.value = Math.floor(Math.sqrt((rpm)/50)*100)/100;
        }
        else {
            this.lowRpmSoundGain.gain.value = 1;
            this.lowRpmSound.playbackRate.value = 1 + rpm/300;
        }
    }
    
    playSquealSoundBySlide(slideValue){
        this.squealSoundGain.gain.value = slideValue;
    }
    
    playSlideSoundBySlide(slideValue){
        //this.slideSoundGain.gain.value = slideValue;
        if(slideValue <= 0){
            slideValue = 0;
        }
        else if(slideValue > 1){
            slideValue = 1;
        }
        
        if(this.slideSoundGain.gain.value+ 0.01 < slideValue){
            this.slideSoundGain.gain.value += 0.01;
        }
        else if(this.slideSoundGain.gain.value- 0.01 > slideValue) {
            this.slideSoundGain.gain.value -= 0.01;
        }
    }
}