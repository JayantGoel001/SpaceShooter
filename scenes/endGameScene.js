class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGame');
    }
    init(data){
        this.score = data.totalScore;
    }

    preload() {
        this.load.image('end-game', 'assets/images/game-end.jpeg');
        this.load.image('again','assets/images/play-again.jpg');
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'end-game').setScale(1);
        this.add.text(config.width/3,50,'Your Score : '+this.score,{
            fontSize:48,
            fill:"#fffff0"
        });
        this.startBtn = this.add.image(config.width / 2, config.height / 2, 'again').setScale(0.27);
        this.startBtn.setInteractive();
        this.startBtn.on('pointerdown',this.againGame,this);
    }
    againGame(){
        this.scene.start('Play');
    }

}
