class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGame');
    }
    init(data){
        this.score = data.totalScore;
    }

    preload() {
        this.load.image('end-game', 'assets/images/game-end.jpeg');
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'end-game').setScale(1);
        this.add.text(config.width/3,50,'Your Score : '+this.score,{
            fontSize:48,
            fill:"#fffff0"
        });
    }

}
