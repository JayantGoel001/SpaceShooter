class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGame');
    }

    preload() {
        this.load.image('end-game', 'assets/images/game-end.jpeg');
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'end-game').setScale(0.75);
    }

}
