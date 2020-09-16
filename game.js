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
let sky, jet, cursors,ammo,bomb;
const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    this.load.image('jet','assets/jet.png');
    this.load.image('bomb','assets/bomb.png');
    this.load.image('ammo','assets/ammo.png');
    this.load.image('coin','assets/coin.png');
}
function create ()
{
    sky = this.add.image(400, 300, 'sky');
    jet = this.physics.add.image(400,500,'jet').setScale(0.15);
    jet.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointerdown',shoot,this);

    bomb = this.physics.add.group({
        key:'bomb',
        repeat:3,
        setXY:{
            X:20,
            Y:50,
            stepX: Phaser.Math.Between(10, config.width - 15),
            stepY: Phaser.Math.Between(15, 300)
        }
    });
}

function shoot(){
    ammo = this.physics.add.image(jet.x,jet.y,'ammo').setScale(0.1);
    ammo.setRotation(-Phaser.Math.PI2/4);
    ammo.setVelocityY(-600);
    this.physics.add.collider(ammo,bomb,destroyBomb,null,this);
}

function destroyBomb(bomb,ammo) {
    bomb.disableBody(true,true);
    ammo.disableBody(true,true);
}
function update() {
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
}