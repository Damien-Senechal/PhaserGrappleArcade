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

        this.hero = this.add.rectangle(100, 400, 20, 20, 0x6666ff);
        this.physics.add.existing(this.hero);
        this.hero.body.collideWorldBounds = true;
        this.hero.body.setBounce(0);
        this.hero.label = this.BALL;
        this.hero.body.onCollide = true

        /*for (let i = 0; i <= 15; i++) {
            let posX = Phaser.Math.Between(0, game.config.width);
            let posY = Phaser.Math.Between(0, game.config.height);
            let width = Phaser.Math.Between(50, 200);
            let height = Phaser.Math.Between(50, 200);
            let rect = this.add.rectangle(posX, posY, width, height, 0x6666ff, {isStatic: true});
            rect.label = this.WALL;
            this.boxes.add(rect)
        }*/
        let rect = this.add.rectangle(0, 800, 200, 100, 0x6666ff, {isStatic: true}).setOrigin(0,0);
        rect.label = this.WALL;
        this.boxes.add(rect);
        let rect3 = this.add.rectangle(600, 800, 200, 100, 0x6666ff, {isStatic: true}).setOrigin(0,0);
        rect.label = this.WALL;
        this.boxes.add(rect3);

        let rect2 = this.add.rectangle(400, 0, 400, 100, 0x6666ff, {isStatic: true});
        rect2.label = this.WALL;
        this.boxes.add(rect2)



        this.physics.add.collider(this.hero, this.boxes)

        this.test = "NIQUE TA GROSSE MERE"
        this.hook = null;
        this.rope = null;
        this.distance2 = 0;
        this.grappling = false;

        this.input.on("pointerdown", this.fireHook, this);
        let me = this;
        this.physics.world.on('collide', function (g1, g2, b1, b2) {

            if (b1.height === 20 || b2.height === 20) {
                console.log("Hello")
                /*if(this.reach){
                    me.hero.body.setVelocity(0)
                    me.hero.body.setImmovable(true)
                    me.hero.body.setAllowGravity(false)
                }else{
                    me.hero.body.setImmovable(false)
                    me.hero.body.setAllowGravity(true)
                }*/
            }

            if (b1.height === 10 || b2.height === 10) {
                //console.log("BAM")
                me.hook.body.setVelocity(0)
                me.hook.body.setImmovable(true)
                me.hook.body.setAllowGravity(false)

                // calculate the distance between the ball and the hook
                this.distance = Phaser.Math.Distance.Between(this.hero.body.x, this.hero.body.y, this.hook.body.x, this.hook.body.y);
                //console.log(distance)
                let target = new Phaser.Math.Vector2();
                target.x = this.hook.body.x
                target.y = this.hook.body.y

                this.grappling = true;
                this.physics.moveToObject(this.hero, target, 500);

                // is the distance fairly greater than hero size?
                /*if(distance < 20){

                    this.physics.moveToObject(this.hero, target, 400);
                    this.reach = true
                    // add the constraint
                    //this.rope.matter.add.constraint(this.hero, this.hook, distance, 0);
                    //this.rope = Phaser.Math.Distance.Between(this.hero.body.x, this.hero.body.y, this.hook.body.x, this.hook.body.y) < distance
                }*/
            }

        }, this)

        this.input.keyboard.on('keydown-A', function () {
            if(me.grappling===false){
                me.hero.body.setAllowGravity(true)
            }
        });
        this.input.keyboard.on('keydown-D', function () {
            me.hero.body.setVelocityX(100)
        });
        this.input.keyboard.on('keydown-Q', function () {
            me.hero.body.setVelocityX(-100)
        });
        this.input.keyboard.on('keyup-D', function () {
            me.hero.body.setVelocityX(0)
        });
        this.input.keyboard.on('keyup-Q', function () {
            me.hero.body.setVelocityX(0)
        });
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
        if(this.hook != null){
            this.hook.destroy();
            this.reach = false
        }
    }

    update() {
        if(this.hook != null){
            this.distance2 = Phaser.Math.Distance.Between(this.hero.body.x, this.hero.body.y, this.hook.body.x, this.hook.body.y);
        }
        else{
            this.distance2 = 0;
        }

        /*if(this.grappling && this.distance2 < 20) {
            this.hero.body.setVelocityY(0)
            this.hero.body.setVelocityX(0)
            this.hero.body.setAllowGravity(false)
            this.grappling = false
        }*/
        if(this.hero.body.velocity.y >= 0 && this.grappling){
            this.hero.body.setVelocityY(0)
            this.hero.body.setVelocityX(0)
            this.hero.body.setAllowGravity(false)
            this.grappling = false
        }
        //console.log(this.hero.body.velocity.y);
    }
}