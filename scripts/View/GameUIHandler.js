class GameUIHandler {
    constructor(){
        this.game = undefined;
        this.dashboardElements = false;
        
        this.currentProblem = [3,5];
        this.currentSolution = "";
    }
    createDashboard(carType){
        if(!this.dashboardElements){
            this.dashboardElements = {
                background: undefined,
                fuel: undefined,
                boost: undefined,
                tractionControl: undefined,
                speedGauge: undefined,
                gasPump: undefined,
                solutionTextField: undefined,
                problemTextField: undefined,
                lmao: undefined,
            }
            
            let background = document.createElement("div");
            background.classList.add('dashboard');
            document.getElementById("gameScreen").appendChild(background);
            background.style.backgroundImage = "url(images/ui/dashboards/" + carType + "_dashboard.png";
            this.dashboardElements.background = background;
            
            let fuelBar = document.createElement("div");
            fuelBar.classList.add('fuelBar');
            background.appendChild(fuelBar);
            this.dashboardElements.fuel = fuelBar;
            
            let speedGauge = document.createElement("div");
            speedGauge.innerHTML = "10mph";
            speedGauge.classList.add('speedGauge');
            background.appendChild(speedGauge);
            this.dashboardElements.speedGauge = speedGauge;
            
            let gasPump = document.createElement("div");
            gasPump.classList.add('gasPump');
            background.appendChild(gasPump);
            this.dashboardElements.gasPump = gasPump;
            
            let solutionTextField = document.createElement("div");
            solutionTextField.classList.add('solutionTextField');
            background.appendChild(solutionTextField);
            this.dashboardElements.solutionTextField = solutionTextField;
            
            let problemTextField = document.createElement("div");
            problemTextField.classList.add('problemTextField');
            background.appendChild(problemTextField);
            this.dashboardElements.problemTextField = problemTextField;
            
            let lmao = document.createElement("div");
            lmao.innerHTML = "LAP 0/10 <br> TIME: 0";
            lmao.classList.add('lmao');
            background.appendChild(lmao);
            this.dashboardElements.lmao = lmao;
            
        }
    }
    updateDashboard(car){
        let color = "green";
        let speed = car.carPhysics.velocity.getMagnitude();
        if(speed > car.carSpecs.topSpeed * 0.25){
            color = "yellow"
        }
        if(speed > car.carSpecs.topSpeed * 0.5){
            color = "orange"
        }
        if(speed > car.carSpecs.topSpeed * 0.75){
            color = "red"
        }
        
        this.dashboardElements.speedGauge.innerHTML =
        "<span style='color: " + color + "'>" + Math.round(car.carPhysics.velocity.getMagnitude() * 4.5) + "</span> <br> <span style='font-size: 30px'>mph</span>";
        
        let fuelPercent = car.carPhysics.currentFuel/car.carSpecs.maxFuel;
        this.dashboardElements.fuel.style.width = 202 * fuelPercent;
    }
    
    updateMathProblem(data){
        if(!isNaN(data) && this.currentSolution.length < 3){
            this.currentSolution += "" + data;
        }
        if(data == "backspace"){
            this.currentSolution = this.currentSolution.substring(0, this.currentSolution.length - 1);
        }
        if(data == "enter"){
            if(this.currentProblem[0] + this.currentProblem[1] == this.currentSolution){
                this.game.playerCar.carPhysics.currentFuel += 25;
                if(this.game.playerCar.carPhysics.currentFuel > this.game.playerCar.carSpecs.maxFuel){
                    this.game.playerCar.carPhysics.currentFuel = this.game.playerCar.carSpecs.maxFuel;
                }
                this.currentProblem[0] = getRandomInt(0,20);
                this.currentProblem[1] = getRandomInt(0,20);
                this.currentSolution = "";
                this.game.physicsOutputStream.reportEvent("checkpoint", 0);
            }
            else {
                this.currentSolution = "";
            }
        }
    }
    
    update(){
        if(this.game && this.game.playerCar){
            if(!this.dashboardElements){
                this.createDashboard(this.game.playerCar.carSpecs.carBodyName);
            }
            else {
                this.updateDashboard(this.game.playerCar);
            }
            
            if(this.game.playerCar.hitbox.collide(this.game.pitStopZone.hitbox) == false){
                this.dashboardElements.problemTextField.style.display = "none";
                this.dashboardElements.solutionTextField.style.display = "none";
                this.dashboardElements.gasPump.style.display = "none";
                this.currentSolution = "";
            }
            else {
                if(this.game.checkpointData.hasPitStopped == false  && this.game.checkpointData.next == 0){
                    let checkpoint = this.game.checkpoints[this.game.checkpointData.order[this.game.checkpointData.next]];
                    checkpoint.visualData.noShow = true;
                    this.game.checkpointData.next++;
                    this.game.checkpoints[this.game.checkpointData.order[this.game.checkpointData.next]].visualData.noShow = false;
                    this.game.checkpointData.hasPitStopped = true;
                    this.game.nextCheckpoint = 1;
                    this.game.checkpointData.lapsFinished++;
                    
                }
                this.dashboardElements.problemTextField.style.display = "block";
                this.dashboardElements.solutionTextField.style.display = "block";
                this.dashboardElements.gasPump.style.display = "block";
            }
        }
        let now = new Date();
        function millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
          }
        this.dashboardElements.lmao.innerHTML = "LAP " + this.game.checkpointData.lapsFinished + "/7 <br> TIME: " + millisToMinutesAndSeconds(now.getTime()-this.game.checkpointData.timeStarted.getTime());
        
        if(this.game.checkpointData.lapsFinished==8){
            alert("Congrats! You have finished the race in " + millisToMinutesAndSeconds(now.getTime()-this.game.checkpointData.timeStarted.getTime()) + "! Thank you for playing this demo :)");
            destroy();
        }
        
        this.dashboardElements.problemTextField.innerHTML = this.currentProblem[0] + "+" + this.currentProblem[1] + "=";
        this.dashboardElements.solutionTextField.innerHTML = this.currentSolution;
    }
    
    coupleToGame(game){
        this.game = game;
        
        //TENTATIVE
        let self = this;
        let listenerId = "listen_" + makeId(10);
        G.inputHandler.addListener(listenerId, "keydown", function(event, data){self.updateMathProblem(data)});
    }
}