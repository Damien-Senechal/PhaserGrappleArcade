var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug : true,
            fps : 60,
            terrainObjects: 20,     // amount of terrain objects
            heroSize: 20,           // hero size
            constraintSpeed: 2,     // constraint shrinkage speed
            minBoxSize: 50,         // minimum box size
            maxBoxSize: 200,        // maximum box size
            hookSpeed: 20
        }
    },
    scene: {
        preload: preload,
        create: create,
        fireHook : fireHook,
        update: update
    }
};

var game = new Phaser.Game(config);

const WALL = 0;
const BALL = 1;
const HOOK = 2;

function preload ()
{
}

function create () {
    this.physics.world.setBounds(10, 10, game.config.width - 20, game.config.height - 20,);

    this.hero = this.add.rectangle(game.config.width / 2, game.config.height / 2, 20, 20, 0x6666ff);
    this.physics.add.existing(this.hero);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.setBounce(0.5);
    this.hero.label = BALL;
    this.hero.body.onCollide = true

    for (let i = 0; i <= 15; i++) {
        let posX = Phaser.Math.Between(0, game.config.width);
        let posY = Phaser.Math.Between(0, game.config.height);
        let width = Phaser.Math.Between(50, 200);
        let height = Phaser.Math.Between(50, 200);
        let rect = this.add.rectangle(posX, posY, width, height, 0x6666ff, {isStatic: true});
        this.physics.add.existing(rect);
        rect.body.collideWorldBounds = true;
        rect.body.setAllowGravity(false);
        rect.body.setImmovable(true);
        this.physics.add.collider(this.hero, rect)
        rect.label = WALL;
        rect.body.onCollide = true
    }

    this.hook = null
    this.rope = null;

    this.input.on("pointerdown", fireHook, this);

    this.physics.world.on('collide', function(b1, b2) {
        ///console.log("Hello")
        // when the ball collides with something, we'll remove the hook
        if (b1.label === BALL || b2.label === BALL) {
            console.log("Hello")
            //this.releaseHook();
        }

        if ((b1.label === HOOK || b2.label === HOOK) && !this.rope) {

            // make the hook static
            Phaser.Physics.Matter.Matter.Body.setStatic(this.hook, true);

            // calculate the distance between the ball and the hook
            let distance = Phaser.Math.Distance.Between(this.hero.position.x, this.hero.position.y, this.hook.position.x, this.hook.position.y);

            // is the distance fairly greater than hero size?
            if (distance > gameOptions.heroSize * 2) {

                // add the constraint
                this.rope = this.physics.add.constraint(this.hero, this.hook, distance, 0);
            }

        }
    }, this)
}

function fireHook(e){
    let angle = Phaser.Math.Angle.Between(this.hero.body.x, this.hero.body.y, e.position.x, e.position.y);
    this.physics.add.constraint(this.hero, this.hook, 0, 0);
}

function update(){
}