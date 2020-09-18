class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGame');
    }

    preload() {
        this.load.image('end-game', 'assets/images/game-end.jpg');
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'end-game');
    }

    startGame() {
        this.scene.start('Play');
    }
}
