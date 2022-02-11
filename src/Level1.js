class Level1 extends Phaser.Physics.Arcade.Sprite {

    //Constructeur de Wall
    /*constructor (scene, x, y) {
        //On appelle le constructeur parent avec super
        super(scene, x, y, 'hero');
        this._speed = 160;
        this._jumpSpeed = 200;

        //On ajoute le sprite et ça physique a la scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //On initialise ces paramètre de creation
        this.body.collideWorldBounds = true;
        this.body.setBounce(0.2);
        this.label = this.BALL;
        this.body.onCollide = true
        this.setScale(2);
    }*/

    constructor(scene, x, y) {
        super(scene, x, y);
        this.boxes = scene.physics.add.group({
            collideWorldBounds: true,
            allowGravity: false,
            immovable: true,
            onCollide: true
        })

        let rect = scene.add.rectangle(0, 800, 200, 100, 0x6666ff, {isStatic: true}).setOrigin(0,0);
        rect.label = scene.WALL;
        this.boxes.add(rect);
        let rect2 = scene.add.rectangle(400, 0, 400, 100, 0x6666ff, {isStatic: true}).setOrigin(0,0);
        rect2.label = scene.WALL;
        this.boxes.add(rect2);
        let rect3 = scene.add.rectangle(600, 800, 200, 100, 0x6666ff, {isStatic: true}).setOrigin(0,0);
        rect.label = scene.WALL;
        this.boxes.add(rect3);

        scene.physics.add.collider(scene.hero, this.boxes)

    }
}