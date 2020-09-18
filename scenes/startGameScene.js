class StartGameScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('start-game', 'assets/images/game-start.jpg');
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'start-game').setScale(0.8);
    }
}
