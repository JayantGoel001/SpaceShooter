class PlayGameScene extends Phaser.Scene {

    constructor() {
        super('Play');
        this.score=0;
        this.gameOver = false;
    }

    preload() {
        this.load.image('sky', 'assets/images/space3.png');
        this.load.image('jet', 'assets/images/jet.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.image('ammo', 'assets/images/ammo.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.audio('gun-shot', 'assets/audio/gunshot.wav');
        this.load.audio('coinhit', 'assets/audio/coinhit.wav');
        this.load.audio('end', 'assets/audio/end.mp3');
    }

    setObjectVelocity(bombs) {
        bombs.children.iterate(function (bomb) {
            let xVel = Phaser.Math.Between(-100, 100);
            let yVel = Phaser.Math.Between(130, 180);
            bomb.setVelocity(xVel, yVel);
        });
    }

    collectCoins(jet, coin) {
        this.coinHit.play();
        coin.disableBody(true, true);
        let x = Phaser.Math.Between(0, config.width - 15);
        let y = Phaser.Math.Between(0, 200);
        coin.enableBody(true, x, y, true, true);
        let xVel = Phaser.Math.Between(-100, 100);
        let yVel = Phaser.Math.Between(130, 180);
        coin.setVelocity(xVel, yVel);
        this.score += 10;
        this.scoreText.setText('Score : ' + this.score);

    }

    endGame(jet) {
        this.end.play();
        jet.setTint(0xff1000);
        this.gameOver = true;
        this.physics.pause();

    }

    create() {
        this.sky = this.add.tileSprite(config.width / 2, 300, config.width, config.height, 'sky');
        this.jet = this.physics.add.image(config.width / 2, 600, 'jet').setScale(0.15);
        this.jet.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', this.shoot, this);

        this.bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 3,
            setXY: {
                X: 20,
                Y: 50,
                stepX: Phaser.Math.Between(10, config.width - 15),
                stepY: Phaser.Math.Between(15, 200)
            }
        });
        this.coins = this.physics.add.group();
        for (let i = 0; i < 5; i++) {
            let x = Phaser.Math.Between(0, config.width - 15);
            let y = Phaser.Math.Between(0, 200);
            this.coins.create(x, y, 'coin').setScale(0.75);
        }
        this.setObjectVelocity(this.bombs);
        this.setObjectVelocity(this.coins);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            hideOnComplete: true
        });
        this.physics.add.collider(this.jet, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.jet, this.bombs, this.endGame, null, this);
        this.gunShot = this.sound.add('gun-shot');
        this.coinHit = this.sound.add('coinhit');
        this.end = this.sound.add('end');

        this.scoreText = this.add.text(15, 15, 'Score : 0', {
            fontSize: 31,
            fill: '#19F8B0'
        });
    }

    shoot() {
        this.ammo = this.physics.add.image(this.jet.x, this.jet.y, 'ammo').setScale(0.1).setOrigin(0.5, 0);
        this.ammo.setRotation(-Phaser.Math.PI2 / 4);
        this.ammo.setVelocityY(-600);
        this.physics.add.collider(this.ammo, this.bombs, this.destroyBomb, null, this);

    }

    destroyBomb(ammo, bomb) {
        this.gunShot.play();

        this.explosion = this.add.sprite(bomb.x, bomb.y, 'explosion').setScale(3);
        this.explosion.play('explode');
        bomb.disableBody(true, true);
        ammo.disableBody(true, true);
        let x = Phaser.Math.Between(0, config.width - 15);
        let y = Phaser.Math.Between(0, 200);
        bomb.enableBody(true, x, y, true, true);
        let xVel = Phaser.Math.Between(-100, 100);
        let yVel = Phaser.Math.Between(130, 180);
        bomb.setVelocity(xVel, yVel);
        this.score += 20;
        this.scoreText.setText('Score : ' + this.score);

    }

    checkForRepos(bombs) {
        bombs.children.iterate(function (bomb) {
            if (bomb.y > config.height) {
                bomb.y = 0;
                bomb.x = Phaser.Math.Between(15, config.width - 15);
            }
        })
    }


    update() {
        if (this.gameOver === true && !this.end.isPlaying) {
            this.gameOver = false;

            this.scene.start('EndGame',{totalScore:this.score});
            this.score =0;
            return;
        }

        this.sky.tilePositionY -= 0.5;

        if (this.cursors.left.isDown) {
            this.jet.setVelocityX(-150);
        } else if (this.cursors.right.isDown) {
            this.jet.setVelocityX(150);
        } else {
            this.jet.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.jet.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.jet.setVelocityY(150);
        } else {
            this.jet.setVelocityY(0);
        }


        this.checkForRepos(this.bombs);
        this.checkForRepos(this.coins);
    }
}