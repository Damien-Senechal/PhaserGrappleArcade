var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug : true,
            fps : 60
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

    this.boxes = this.physics.add.group({
        collideWorldBounds: true,
        allowGravity : false,
        immovable : true,
        onCollide : true
    })

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
        rect.label = WALL;
        this.boxes.add(rect)
    }
    this.physics.add.collider(this.hero, this.boxes)

    this.hook = null
    this.rope = null;

    this.input.on("pointerdown", fireHook, this);
    let me = this;
    this.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
        console.log(body1)

        /*if(body1.height===20 || body2.height===20){
            console.log("Hello")
        }

        if(body1.height===10 || body2.height===10){
            console.log("BAM")
            me.physics.body.setImmovable(true)

            // calculate the distance between the ball and the hook
            let distance = Phaser.Math.Distance.Between(this.hero.position.x, this.hero.position.y, this.hook.position.x, this.hook.position.y);

            // is the distance fairly greater than hero size?
            if(distance > gameOptions.heroSize * 2){

                // add the constraint
                this.rope = this.matter.add.constraint(this.hero, this.hook, distance, 0);
            }
        }*/

    }, this)
}

function fireHook(e){
    let angle = Phaser.Math.Angle.Between(this.hero.body.x, this.hero.body.y, e.position.x, e.position.y);
    this.hook = this.add.rectangle(this.hero.body.x + (20 * 2) * Math.cos(angle), this.hero.body.y + (20 * 2) * Math.sin(angle), 10, 10);
    this.hook.label = HOOK;
    this.physics.add.existing(this.hook);
    this.hook.body.setVelocity(400 * Math.cos(angle), 400 * Math.sin(angle))
    this.physics.add.collider(this.hook, this.boxes)
}

function update(){
}