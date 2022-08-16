export class UI {
    constructor(game)
    {this.game = game;
        this.fontSize = 30 ;
        this.fontFamily = 'Creepster';
    }
    draw(context)
    {   context.save();
        context.shadowOffsetX = 2;
        context.shadowOfffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur =0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor ;
        context.fillText('Score :'  + this.game.score, 20 , 40);
        //Derciption
        context.font = 20 + 'px ' + this.fontFamily;
        context.fillStyle = 'grey' ;
        context.fillText('Press Enter + Arrow for Rolling'  , 160 , 40);
        context.fillText('Press Enter + ArrowDown for Diving'  , 160 , 80);
        //timer 
        context.font = this.fontSize * 0.8 + 'px ' +this.fontFamily ;
        context.fillStyle = 'black' ;
        context.fillText('Time :' + (this.game.time* 0.001).toFixed(1), 20 , 80 );
        //game over messages
        if(this.game.gameOver)
        {
            context.textAlign = 'center';
            context.font =this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score> 5)
            {
            context.fillText('Boo-yah',this.game.width * 0.5  , this.game.height * 0.5 - 50);
            context.font =this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText('What are creatures of the night afraid of ? YOU !!!', this.game.width * 0.5  , this.game.height * 0.5 )
            }
             else
          {
            context.textAlign = 'center';
            context.font =this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Love at first bite ?',this.game.width * 0.5  , this.game.height * 0.5 - 50);
            context.font =this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText('Nope. Better luck next time!', this.game.width * 0.5  , this.game.height * 0.5 )
          }
    }
    context.restore()
}}