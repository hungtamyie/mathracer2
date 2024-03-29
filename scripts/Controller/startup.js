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
    let imagesToLoad = [["entities", "./images/entities.png"],
                        ["checkpoints", "./images/checkpoints.png"],
                        ["particles", "./images/particles.png"],
                        ["Isere_map", "./images/maps/Isere_map.png"],
                        ["Isere_data", "./images/maps/Isere_data.png"],
                        ["striker", "./images/cars/striker.png"],
                        ["zipline", "./images/cars/zipline.png"],
                        ["kart", "./images/cars/kart.png"],
                        ["striker_dashboard", "./images/ui/dashboards/striker_dashboard.png"],
                    ];
    let soundsToLoad = [
        ["striker_idle", "sounds/car/striker_idle.wav"],
        ["striker_100rpm", "sounds/car/striker_idle.wav"],
        ["kart_idle", "sounds/car/kart_idle.wav"],
        ["kart_100rpm", "sounds/car/kart_100rpm.wav"],
        ["zipline_idle", "sounds/car/kart_idle.wav"],
        ["zipline_100rpm", "sounds/car/kart_100rpm.wav"],
        ["squeal_loop", "sounds/sfx/squeal_loop.wav"],
        ["slide_loop", "sounds/sfx/slide_loop.wav"],
        ["tire_hit", "sounds/sfx/tire_hit.wav"],
        ["rock_hit", "sounds/sfx/rock_hit.wav"],
        ["tree_hit", "sounds/sfx/tree_hit.wav"],
        ["bell", "sounds/sfx/bell.wav"],
    ];
    G.assetHandler = new AssetHandler();
    
    document.onmousedown = function(){
    G.assetHandler.loadImages(imagesToLoad, function(){
            document.onmousedown = false;
            G.audioContext = new AudioContext();
            G.assetHandler.loadSounds(soundsToLoad, function(){
                G.inputHandler = new InputHandler();
                G.gameController = new GameController();
                G.soundEngine = new SoundEngine();
                G.gameUIHandler = new GameUIHandler();
                
                G.gameController.createNewGame("Isere");
                G.inputHandler.coupleToGameController(G.gameController);
                G.soundEngine.coupleToGame(G.gameController.game);
                G.gameUIHandler.coupleToGame(G.gameController.game)
                G.gameController.addMyCar();
                G.gameController.start();
                //G.mapEditor = new MapEditor();
            });
        });
    }
}