export class CollisionAnimation {
    constructor(game,x,y)
    {
        this.game= game;
        this.image = boom;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth *  this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion =false;
        this.fps = Math.random() * 10 + 5 ; 
        this.frameInterval = 1000 / this.fps;
        this.frameTime = 0;
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spriteWidth, 0 ,this.spriteWidth,this.spriteHeight , this.x ,this.y, this.width ,this.height)
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTime > this.frameInterval)
        {
            this.frameX ++ ;
            this.frameTime = 0;
        }
        else {
            this.frameTime += deltaTime;
        }
        if(this.frameX >  this.maxFrame) this.markedForDeletion = true;
    }
}