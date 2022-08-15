    import { Dust, Fire, Splash } from "./particles.js";
    
    const states = {
        SITTING : 0,
        RUNNING : 1 ,
        JUMPING : 2,
        FALLING : 3,
        ROLLING : 4,
        DIVING : 5 ,
        HIT : 6
    }
   

    class State { 
            contructor(state,game){
                this.state = state;
                this.game = game;
               
            }
        }
      
    export class Sitting extends State {
        constructor(game) {
          super('SITTING',game);
          this.state = 'SITTING';
          this.game = game;
          
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.frameY = 5;
            this.game.player.maxFrame = 4 ;
        }
        handlerInput(input){
            if(input.includes("ArrowLeft") || input.includes("ArrowRight")){
                this.game.player.setState(states.RUNNING,1);
            }
            else if (input.includes('Enter')){
                this.game.player.setState(states.ROLLING,2)
            }


        }
       
      }
     export class Running extends State {
        constructor(game) {
          super('RUNNING',game);
          this.state = 'RUNNING';
          this.game = game;
      
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.maxFrame =6;
            this.game.player.frameY = 3;
        }
        handlerInput(input){
            this.game.particles.unshift(new Dust(this.game , this.game.player.x + this.game.player.width * 0.5, this.game.player.y+ this.game.player.height))
            if(input.includes("ArrowDown") ){
                this.game.player.setState(states.SITTING,0);
            }
            else if(input.includes("ArrowUP")){
                this.game.player.setState(states.JUMPING,1);
            }

            else if (input.includes('Enter')){
                this.game.player.setState(states.ROLLING,2)
            }

        }
       
      }
     export class Jumping extends State {
        constructor(game) {
          super('JUMPING',game);
          this.state = 'JUMPING';
          this.game = game;
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.maxFrame = 6;
            this.game.player.frameY = 1;
            if(this.game.player.onGround()) this.game.player.vy -= 27;
        }
        handlerInput(input){
            if(input.game.player.vy > this.game.player.weight ){
                this.game.player.setState(states.FALLING,1);
            } 
            else if(input.includes('Enter')){
                this.game.player.setState(states.ROLLING,2)
            }
            else if(input.includes("ArrowDown")){
                this.game.player.setState(states.DIVING, 0)
            }
        }
       
      }
     export class Falling extends State {
        constructor(game) {
          super('FALLING',game);
          this.state = 'FALLING';
          this.game = game;
          
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.maxFrame = 6;
            this.game.player.frameY = 2;
            if(this.game.player.onGround()) this.game.player.vy -= 27;
        }
        handlerInput(input){
            if(this.game.player.onGround() ){
                this.game.player.setState(states.RUNNING,1);
            }
            else if (input.includes("ArrowDown")){
                this.game.player.setState(states.DIVING, 0)
            }

        }
       
      }
     export class Rolling extends State {
        constructor(game) {
          super('ROLLING',game);
          this.state = 'ROLLING';
          this.game = game;
          
          
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.maxFrame = 5;
            this.game.player.frameY = 6;

        }
        handlerInput(input){
            this.game.particles.unshift(new Fire(this.game , this.game.player.x + this.game.player.width * 0.5, this.game.player.y+ this.game.player.height*0.5))
            if(!input.includes('Enter') && this.game.player.onGround()){
                this.game.player.setState(states.RUNNING,1);
            }
            else if (!input.includes('Enter') && !this.game.player.onGround()){
                this.game.player.setState(states.FALLING,1);
            }
            else if (input.includes('Enter') && this.game.player.onGround() && input.includes('ArrowUp')){
                this.game.player.vy -= 1;    
            }   
            
        }
       
      }
     export class Diving extends State {
        constructor(game) {
          super('DIVING',game);
          this.state = 'DIVING';
          this.game = game;
          
          
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.maxFrame = 5;
            this.game.player.frameY = 6;
            this.game.player.vy = 20;
        }
        handlerInput(input){
            this.game.particles.unshift(new Fire(this.game , this.game.player.x + this.game.player.width * 0.5, this.game.player.y+ this.game.player.height*0.5))
            if( this.game.player.onGround()){
                this.game.player.setState(states.RUNNING,1);
                for(let i = 0 ; i <30 ; i++)
                {
                    this.game.particles.unshift(new Splash(this.game,this.game.player.x +this.game.player.width*0.5 , this.game.player.y + this.game.player.height ))
                }

            }
            else if (input.includes('Enter') && !this.game.player.onGround()){
                this.game.player.setState(states.ROLLING,2);
            }
           
            
        }
       
      }
     export class Hit extends State {
        constructor(game) {
          super('HIT',game);
          this.state = 'HIT';
          this.game = game;
          
          
        }
        enter(){
            this.game.player.frameX = 0;
            this.game.player.maxFrame = 10;
            this.game.player.frameY = 4;
          
        }
        handlerInput(input){
            
            if( this.game.player.frameX >= 10 && this.game.player.onGround()){
                this.game.player.setState(states.RUNNING,1);
            }
            else if (this.game.player.frameX >=10 && !this.game.player.onGround()){
                this.game.player.setState(states.FALLING,1);
            }
        }
    }
               

           
            
       