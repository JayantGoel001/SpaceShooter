const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update : update
    }
};
let sky, jet, cursors,ammo,bombs,explosion,gunShot,coinHit,coins;
const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    this.load.image('jet','assets/images/jet.png');
    this.load.image('bomb','assets/images/bomb.png');
    this.load.image('ammo','assets/images/ammo.png');
    this.load.image('coin','assets/images/coin.png');
    this.load.spritesheet('explosion','assets/spritesheets/explosion.png',{
       frameWidth:16,
       frameHeight:16
    });
    this.load.audio('gun-shot','assets/audio/gunshot.wav');
    this.load.audio('coinhit','assets/audio/coinhit.wav');
}

function setObjectVelocity(bombs) {
    bombs.children.iterate(function (bomb) {
            let xVel = Phaser.Math.Between(-100,100);
            let yVel = Phaser.Math.Between(130,180);
            bomb.setVelocity(xVel,yVel);
        });
}

function collectCoins(jet,coin) {
    coinHit.play();
    coin.disableBody(true,true);
    let x = Phaser.Math.Between(0,config.width-15);
    let y = Phaser.Math.Between(0,200);
    coin.enableBody(true,x,y,true,true);
    let xVel = Phaser.Math.Between(-100,100);
    let yVel = Phaser.Math.Between(130,180);
    coin.setVelocity(xVel,yVel);

}
function create ()
{
    sky = this.add.tileSprite(400, 300,config.width,config.height, 'sky');
    jet = this.physics.add.image(400,500,'jet').setScale(0.15);
    jet.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointerdown',shoot,this);

    bombs = this.physics.add.group({
        key:'bomb',
        repeat:3,
        setXY:{
            X:20,
            Y:50,
            stepX: Phaser.Math.Between(10, config.width - 15),
            stepY: Phaser.Math.Between(15, 300)
        }
    });
    coins = this.physics.add.group();
    for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(0,config.width-15);
        let y = Phaser.Math.Between(0,200);
        let newCoin = coins.create(x,y,'coin').setScale(0.75);

    }
    setObjectVelocity(bombs);

    setObjectVelocity(coins);
    this.anims.create({
        key:'explode',
        frames:this.anims.generateFrameNumbers('explosion'),
        frameRate:20,
        hideOnComplete:true
    });
    this.physics.add.collider(jet,coins,collectCoins,null,this);
    gunShot = this.sound.add('gun-shot');
    coinHit = this.sound.add('coinhit');
}
function shoot(){
    ammo = this.physics.add.image(jet.x,jet.y,'ammo').setScale(0.1).setOrigin(0.5,0);
    ammo.setRotation(-Phaser.Math.PI2/4);
    ammo.setVelocityY(-600);
    this.physics.add.collider(ammo,bombs,destroyBomb,null,this);

}

function destroyBomb(ammo,bomb) {
    gunShot.play();

    explosion = this.add.sprite(bomb.x,bomb.y,'explosion').setScale(3);
    explosion.play('explode');
    bomb.disableBody(true,true);
    ammo.disableBody(true,true);
    let x = Phaser.Math.Between(0,config.width-15);
    let y = Phaser.Math.Between(0,200);
    bomb.enableBody(true,x,y,true,true);
    let xVel = Phaser.Math.Between(-100,100);
    let yVel = Phaser.Math.Between(130,180);
    bomb.setVelocity(xVel,yVel);

}

function resetPos(bomb) {
    bomb.y = 0;
    bomb.x = Phaser.Math.Between(15, config.width - 15);
}

function checkForRepos(bombs) {
    bombs.children.iterate(function (bomb) {
        if (bomb.y>config.height){
            resetPos(bomb);
        }
    })
}

function update() {
    sky.tilePositionY -= 0.5;

    if (cursors.left.isDown){
        jet.setVelocityX(-150);
    }
    else if (cursors.right.isDown){
        jet.setVelocityX(150);
    }
    else{
        jet.setVelocityX(0);
    }

    if (cursors.up.isDown){
        jet.setVelocityY(-150);
    }
    else if (cursors.down.isDown){
        jet.setVelocityY(150);
    }
    else{
        jet.setVelocityY(0);
    }


    checkForRepos(bombs);
    checkForRepos(coins);
}