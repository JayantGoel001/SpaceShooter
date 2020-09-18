const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter:true,
    physics: {
        default: 'arcade',
    },
    scene:[StartGameScene,PlayGameScene,EndGameScene]
};
const game = new Phaser.Game(config);
