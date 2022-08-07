class Layer{
    contructor(game,width , height , speedModifier , image)
    {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier ;
        this.image = image;
        this.x = 0;
        this.y = 0;


    }
    update (){
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * speedModifier;
    }
    draw(context){
        context.drawImage(this.image , this.x , this.y ,this.width , this.height );
    }
}

export class BackGround {
    contructor(game)
    {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer5image = document.getElementByID(`layer-5`);
        this.layer1 = new Layer(this.game , this.width , this.height , 1 , this.layer5image);
        console.log(this.layer1)
        this.backgroundLayer = [this.layer1];

    }

    update(){
        this.backgroundLayer.forEach( layer =>{
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayer.forEach(layer => {
            layer.draw();
        })
    }

}