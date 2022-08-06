    const states = {
        SITTING : 0,
        RUNNING : 1 ,
        JUMPING : 2,
        FALLING : 3
    }
   

    class State { 
            contructor (state){
                this.state = state;
            }
        }
      
     export class Sitting extends State {
        constructor(player) {
          super('SITTING');
          this.player = player
        }
        enter(){
            this.player.frameY = 5;
        }
        handlerInput(input){
            if(input.includes("ArrowLeft") || input.includes("ArrowRight")){
                this.player.setState(states.RUNNING);
            }

        }
       
      }
     export class Running extends State {
        constructor(player) {
          super('RUNNING');
          this.player = player
        }
        enter(){
            this.player.frameY = 3;
        }
        handlerInput(input){
            if(input.includes("ArrowDown") ){
                this.player.setState(states.SITTING);
            }
            else if(input.includes("ArrowUP")){
                this.player.setState(states.JUMPING);
            }

        }
       
      }
     export class Jumping extends State {
        constructor(player) {
          super('JUMPING');
          this.player = player
        }
        enter(){
            this.player.frameY = 1;
            if(this.player.onGround()) this.player.vy -= 27;
        }
        handlerInput(input){
            if(input.player.vy > this.player.weight ){
                this.player.setState(states.FALLING);
            }

        }
       
      }
     export class Falling extends State {
        constructor(player) {
          super('FALLING');
          this.player = player
        }
        enter(){
            this.player.frameY = 2;
            if(this.player.onGround()) this.player.vy -= 27;
        }
        handlerInput(input){
            if(this.player.onGround() ){
                this.player.setState(states.RUNNING);
            }

        }
       
      }