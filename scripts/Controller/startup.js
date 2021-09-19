//G is the global object which holds all information within the website
var G = {};
window.onload = function(){
    let screen = document.getElementById("gameScreen");
    G.screen = screen;
    G.S = 1;
    window.onresize = resizeGame;
    resizeGame();
    function resizeGame(){
        if(window.innerWidth/16 * 9 > window.innerHeight){
            G.S = window.innerHeight/450;
        }
        else {
            G.S = window.innerWidth/800;
        }
    }
    let imagesToLoad = [["entities", "images/entities.png"],
                        ["checkpoints", "images/checkpoints.png"],
                        ["Isere_map", "images/maps/isere_map.png"],
                        ["Isere_data", "images/maps/isere_data.png"],
                        ["striker", "images/cars/striker.png"],
                        ["kart", "images/cars/kart.png"]];
    let soundsToLoad = [
        ["striker_idle", "sounds/car/striker_idle.wav"],
        ["striker_100rpm", "sounds/car/striker_100rpm.wav"],
        ["kart_idle", "sounds/car/kart_idle.wav"],
        ["kart_100rpm", "sounds/car/kart_100rpm.wav"],
        ["squeal_loop", "sounds/sfx/squeal_loop.wav"],
        ["slide_loop", "sounds/sfx/slide_loop.wav"]
    ];
    G.assetHandler = new AssetHandler();
    
    document.onmousedown = function(){
    G.assetHandler.loadImages(imagesToLoad, function(){
            document.onmousedown = false;
            G.audioContext = new AudioContext();
            G.assetHandler.loadSounds(soundsToLoad, function(){
                G.soundEngine = new SoundEngine();
                G.inputHandler = new InputHandler();
                G.gameController = new GameController();
                G.inputHandler.addListener(G.gameController);
                G.gameController.createNewGame("Isere");
                G.gameController.addMyCar();
                G.gameController.start();
                //G.mapEditor = new MapEditor();
            });
        });
    }
}