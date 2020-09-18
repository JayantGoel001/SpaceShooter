class StartGameScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('start-game', 'assets/images/game-start.jpg');
        this.load.image('start','assets/images/play-now.png')
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'start-game').setScale(0.45);
        this.startBtn = this.add.image(config.width / 2, config.height / 2, 'start');
        this.startBtn.setInteractive();
        this.startBtn.on('pointerdown',this.startGame,this);
    }

    startGame() {
        this.scene.start('Play');
    }
}
