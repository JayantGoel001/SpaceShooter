const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter:true,
    physics: {
        default: 'arcade',
    },
    scene:[StartGameScene,PlayGameScene,new EndGameScene(this.score)]
};
const game = new Phaser.Game(config);
