class Scene extends Phaser.Scene {
    WALL;
    BALL;
    HOOK;

    preload() {
    }

    create() {
        this.physics.world.setBounds(10, 10, game.config.width - 20, game.config.height - 20,);

        this.boxes = this.physics.add.group({
            collideWorldBounds: true,
            allowGravity: false,
            immovable: true,
            onCollide: true
        })

        this.hero = this.add.rectangle(game.config.width / 2, game.config.height / 2, 20, 20, 0x6666ff);
        this.physics.add.existing(this.hero);
        this.hero.body.collideWorldBounds = true;
        this.hero.body.setBounce(0.5);
        this.hero.label = this.BALL;
        this.hero.body.onCollide = true

        for (let i = 0; i <= 15; i++) {
            let posX = Phaser.Math.Between(0, game.config.width);
            let posY = Phaser.Math.Between(0, game.config.height);
            let width = Phaser.Math.Between(50, 200);
            let height = Phaser.Math.Between(50, 200);
            let rect = this.add.rectangle(posX, posY, width, height, 0x6666ff, {isStatic: true});
            rect.label = this.WALL;
            this.boxes.add(rect)
        }
        this.physics.add.collider(this.hero, this.boxes)

        this.test = "NIQUE TA GROSSE MERE"
        this.hook = null;
        this.rope = null;

        this.input.on("pointerdown", this.fireHook, this);
        let me = this;
        this.physics.world.on('collide', function (g1, g2, b1, b2) {

            if (b1.height === 20 || b2.height === 20) {
                console.log("Hello")
            }

            if (b1.height === 10 || b2.height === 10) {
                //console.log("BAM")
                me.hook.body.setVelocity(0)
                me.hook.body.setImmovable(true)
                me.hook.body.setAllowGravity(false)

                // calculate the distance between the ball and the hook
                let distance = Phaser.Math.Distance.Between(this.hero.body.x, this.hero.body.y, this.hook.body.x, this.hook.body.y);
                console.log(distance)

                me.rope = true
                // is the distance fairly greater than hero size?
                /*if(distance > 20 * 2){

                    // add the constraint
                    this.rope.matter.add.constraint(this.hero, this.hook, distance, 0);
                    this.rope = Phaser.Math.Distance.Between(this.hero.body.x, this.hero.body.y, this.hook.body.x, this.hook.body.y) < distance
                }*/
            }

        }, this)
    }

    fireHook(e) {
        this.releaseHook()
        let angle = Phaser.Math.Angle.Between(this.hero.body.x, this.hero.body.y, e.position.x, e.position.y);
        this.hook = this.add.rectangle(this.hero.body.x + (20 * 2) * Math.cos(angle), this.hero.body.y + (20 * 2) * Math.sin(angle), 10, 10);
        this.physics.add.existing(this.hook);
        this.hook.body.setVelocity(400 * Math.cos(angle), 400 * Math.sin(angle))
        this.hook.label = this.HOOK;
        this.physics.add.collider(this.hook, this.boxes)
        this.hook.body.onCollide = true;

    }

    releaseHook() {
    }

    update() {
    }
}