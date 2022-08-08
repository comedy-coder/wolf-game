import { Sitting ,Running,Jumping,Falling} from "./playerState.js";
export class Player{
    constructor(game){
        this.game = game ;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.image = player;
        this.speed = 1;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0
        this.maxSpeed = 10
        this.weight = 1;
        this.states = [new Sitting(this),new Running(this), new Jumping(this) , new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
       

    }   
    update(input,deltaTime)
    
    {   this.currentState.handlerInput(input)
               // horizontal movemont
        this.x += this.speed
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
            else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
            else this.speed = 0;
        if( this.x < 0 ) this.x= 0;
        if(this.x > this.game.width - this.width ) this.x =this.game.width - this.width;         
        // vertical movemont
        if(input.includes("ArrowUp") && this.onGround()) this.vy -= 27;
        this.y  +=this.vy;
        if(!this.onGround() ) this.vy += this.weight;
        else this.vy = 0;
        //spirte animation
       if(this.frameTimer  > this.frameInterval){
           this.frameTimer = 0;
           if(this.frameX < this.maxFrame) this.frameX ++;
           else this.frameX = 0;
        }
        else this.frameTimer += deltaTime;


    }
    draw(context){
        context.drawImage(this.image,this.frameX* this.width,this.frameY*this.height,this.width,this.height   ,this.x,this.y,this.width,this.height )
        
       
       
    }
    onGround(){
        return this.y >= this.game.height -this.height - this.game.groundMargin;
    }
    setState(state){
        this.currentState = this.states[state];
       this.currentState.enter();
    }
}