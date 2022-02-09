class Hero extends Phaser.Physics.Arcade.Sprite {

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    //Constructeur de Wall
    constructor (scene, x, y) {
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
    }
}