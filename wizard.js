// This example uses the Phaser 2.0.4 framework

// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image('sombrero', 'Obj_Sombrero.png');
    this.game.load.image('background', 'Fondo_Rocas_Agua.jpg');
    this.game.load.image('elemento_agua', 'Obj_Elemento_Agua.png');
    this.game.load.image('elemento_fuego', 'Obj_Elemento_Fuego.png');
    this.game.load.image('elemento_moneda', 'Obj_Moneda_.png');
    this.game.load.image('elemento_moneda_puntaje', 'Obj_Moneda_puntaje.png');
    this.game.load.image('elemento_reloj', 'Obj_Reloj.png');
    this.game.load.image('elemento_calavera', 'Obj_Skull_.png');
    this.game.load.image('elemento_power', 'Obj_Power.png');
    this.game.load.image('elemento_random', 'Obj_Random.png');
    this.game.load.image('power0', 'power_monitor_0_0.png');
    this.game.load.image('power1', 'power_monitor_1_0.png');
    this.game.load.image('power2', 'power_monitor_2_0.png');
    this.game.load.image('power3', 'power_monitor_3_0.png');
    this.game.load.image('power4', 'power_monitor_4_0.png');
    this.game.load.image('power5', 'power_monitor_5_0.png');
    this.game.load.image('power_agua', 'power_agua.png');
    this.game.load.spritesheet('boom', 'sprite_humo.png',58, 58);
    this.game.load.image('background_final', 'background_final_.png');
    this.game.load.spritesheet('button', 'button_sprite_sheet.png', 193, 71);
    this.game.load.spritesheet('button_reiniciar', 'button_reiniciar_sprite.png', 128, 46);
    this.game.load.spritesheet('button_share', 'button_share_sprite.png', 86, 48);
    this.game.load.spritesheet('button_menu', 'button_menu_sprite.png', 88, 48);

    
    
    // Audio
    this.game.load.audio('sfx', 'multimedia_pop_up_alert_tone_3.mp3');
    this.game.load.audio('power_agua_sfx', 'water_splash_or_movement_6.mp3');
    this.game.load.audio('water_song', 'babel_tower_.ogg');
    this.game.load.audio('calavera_sfx', 'hiss_beast_screech.mp3');
    this.game.load.audio('take_power_sfx', 'comedy_marimba_ascend_002.mp3');


};

var sombrero;
var objeto_agua, objetos_agua;
var objeto_fuego, objetos_fuego;
var moneda, monedas;
var calavera, calaveras;
var power, powers;
var random, randoms;
//var objetos;
var score = 0, scoreString = '', scoreText;
var timeLimit = 300, timeCount;
var powerMonitor, powerCount = 0;;
var powerAgua, powerAguaActive = 0;
var explosions;
var sonido_moneda, song, sonido_calavera, take_power_sound;

// Setup the example
GameState.prototype.create = function() {
    
    take_power_sound = game.add.audio('take_power_sfx');
    take_power_sound.volume = 0.3;

    sonido_calavera = game.add.audio('calavera_sfx');
    sonido_calavera.volume = 0.3;

    sonido_moneda = game.add.audio('sfx');
    sonido_moneda.volume = 0.2;

    power_agua_sound = game.add.audio('power_agua_sfx');
    song = game.add.audio('water_song');
    song.volume = 0.5;
    song.play('',0,1,true);

    // Set stage background
    this.game.add.tileSprite(0, 0, 810, 600, 'background');

    // Create a follower
    sombrero = this.game.add.existing(
        new Follower(this.game, this.game.width/2, this.game.height/2, this.game.input)
    );
    this.game.physics.enable(sombrero, Phaser.Physics.ARCADE);

    // Crear Objetos Monedas
    monedas = this.game.add.group();
    monedas.enableBody = true;
    monedas.physicsBodyType = Phaser.Physics.ARCADE;
    monedas.createMultiple(12, 'elemento_moneda');
    monedas.setAll('anchor.x', 0.5);
    monedas.setAll('anchor.y', 0.5);
    monedas.setAll('outOfBoundsKill', true);
    monedas.setAll('checkWorldBounds', true);

    // Crear Objetos Calavera
    calaveras = this.game.add.group();
    calaveras.enableBody = true;
    calaveras.physicsBodyType = Phaser.Physics.ARCADE;
    calaveras.createMultiple(8, 'elemento_calavera');
    calaveras.setAll('anchor.x', 0.5);
    calaveras.setAll('anchor.y', 0.5);
    calaveras.setAll('outOfBoundsKill', true);
    calaveras.setAll('checkWorldBounds', true);

    // Crear Objetos Agua
    objetos_agua = this.game.add.group();
    objetos_agua.enableBody = true;
    objetos_agua.physicsBodyType = Phaser.Physics.ARCADE;
    objetos_agua.createMultiple(1, 'elemento_agua');
    objetos_agua.setAll('anchor.x', 0.5);
    objetos_agua.setAll('anchor.y', 0.5);
    objetos_agua.setAll('outOfBoundsKill', true);
    objetos_agua.setAll('checkWorldBounds', true);

    // Crear Objetos Fuego
    objetos_fuego = this.game.add.group();
    objetos_fuego.enableBody = true;
    objetos_fuego.physicsBodyType = Phaser.Physics.ARCADE;
    objetos_fuego.createMultiple(1, 'elemento_fuego');
    objetos_fuego.setAll('anchor.x', 0.5);
    objetos_fuego.setAll('anchor.y', 0.5);
    objetos_fuego.setAll('outOfBoundsKill', true);
    objetos_fuego.setAll('checkWorldBounds', true);

    // Crear Objetos Power
    powers = this.game.add.group();
    powers.enableBody = true;
    powers.physicsBodyType = Phaser.Physics.ARCADE;
    powers.createMultiple(1, 'elemento_power');
    powers.setAll('anchor.x', 0.5);
    powers.setAll('anchor.y', 0.5);
    powers.setAll('outOfBoundsKill', true);
    powers.setAll('checkWorldBounds', true);

    // Crear Objetos Random
    randoms = this.game.add.group();
    randoms.enableBody = true;
    randoms.physicsBodyType = Phaser.Physics.ARCADE;
    randoms.createMultiple(1, 'elemento_random');
    randoms.setAll('anchor.x', 0.5);
    randoms.setAll('anchor.y', 0.5);
    randoms.setAll('outOfBoundsKill', true);
    randoms.setAll('checkWorldBounds', true);

    
    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'boom');
    explosions.forEach(setupCalavera, this);

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.game.input.x = this.game.width/2;
    this.game.input.y = this.game.height/2;

    //  The score
    scoreText = game.add.text(725, 535, scoreString + score, { font: '26px Arial', fill: '#fff' });
    this.game.add.sprite(695, 540, 'elemento_moneda_puntaje');
    timeCount =  game.add.text(725, 507, timeLimit, { font: '26px Arial', fill: '#fff' });
    this.game.add.sprite(695, 510, 'elemento_reloj');

    // Power Monitor
    powerMonitor = game.add.sprite(10, 350, 'power0');
};


// The update() method is called every frame
GameState.prototype.update = function() {
    
    timeCounter();

    objeto_agua = objetos_agua.getFirstExists(false);
    if (objeto_agua)
    {       
            //  And fire it
            this.game.physics.enable(objeto_agua, Phaser.Physics.ARCADE);
            objeto_agua.reset(game.world.randomX, 20);
            objeto_agua.body.velocity.y = 100;
    }
    objeto_fuego = objetos_fuego.getFirstExists(false);
    if (objeto_fuego)
    {       
            //  And fire it
            this.game.physics.enable(objeto_fuego, Phaser.Physics.ARCADE);
            objeto_fuego.reset(game.world.randomX, 20);
            objeto_fuego.body.velocity.y = 100;
    }
    moneda = monedas.getFirstExists(false);
    if (moneda)
    {       
            //  And fire it
            this.game.physics.enable(moneda, Phaser.Physics.ARCADE);
            moneda.reset(game.world.randomX, -600 + game.world.randomY);
            moneda.body.velocity.y = 150;
    }
    calavera = calaveras.getFirstExists(false);
    if (calavera)
    {       
            //  And fire it
            this.game.physics.enable(calavera, Phaser.Physics.ARCADE);
            calavera.reset(game.world.randomX, -600 + game.world.randomY);
            calavera.body.velocity.y = 200;
    }
    power = powers.getFirstExists(false);
    if (power)
    {       
            //  And fire it
            this.game.physics.enable(power, Phaser.Physics.ARCADE);
            power.reset(game.world.randomX, -500);
            power.body.velocity.y = 220;
    }
    random = randoms.getFirstExists(false);
    if (random)
    {       
            //  And fire it
            this.game.physics.enable(random, Phaser.Physics.ARCADE);
            random.reset(game.world.randomX, 20);
            random.body.velocity.y = 200;
    }

    // Lanzar Power
    waterPower();

    game.physics.arcade.overlap(sombrero, objetos_agua, sombreroAtrapaObjetoAgua, null, this);
    game.physics.arcade.overlap(sombrero, objetos_fuego, sombreroAtrapaObjetoFuego, null, this);
    game.physics.arcade.overlap(sombrero, monedas, sombreroAtrapaMoneda, null, this);
    game.physics.arcade.overlap(sombrero, calaveras, sombreroAtrapaCalavera, null, this);
    game.physics.arcade.overlap(sombrero, powers, sombreroAtrapaPower, null, this);
    game.physics.arcade.overlap(sombrero, randoms, sombreroAtrapaRandom, null, this);
    game.physics.arcade.overlap(powerAgua, calaveras, poderChocaMalos, null, this);
};

function setupCalavera (calavera) {

    calavera.anchor.x = 0.1;
    calavera.anchor.y = 0.1;
    calavera.animations.add('boom');


}

function waterPower(){
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && powerCount == 5)
    {
        power_agua_sound.play();
        this.game.add.sprite(10, 350, 'power0');
        powerCount = 0;
        powerAgua = this.game.add.sprite(-300, 200, 'power_agua');
        powerAgua.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(powerAgua, Phaser.Physics.ARCADE);
        powerAgua.body.velocity.x = 1200;

    }
}

function poderChocaMalos(powerAgua,objeto){
    objeto.kill();

    // Explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(objeto.body.x, objeto.body.y);
    explosion.play('boom', 30, false, true);

}

function timeCounter(){
    mySeconds = Math.floor(game.time.totalElapsedSeconds());
    timeCount.text = timeLimit - mySeconds;

    if (timeLimit - mySeconds == 0){
        // timeCount.text = timeLimit;
        // game.time.reset();
        
        // Set stage background
        this.game.add.sprite(0, 0,'background_final');
        button_share = game.add.button(this.game.world.centerX - 40, 320, 'button_share', actionOnClick, this, 2, 1, 0);
        button_menu = game.add.button(this.game.world.centerX - 85, 380, 'button_menu', actionOnClick, this, 2, 1, 0);
        button_reiniciar = game.add.button(this.game.world.centerX + 5, 380, 'button_reiniciar', actionOnClick, this, 2, 1, 0);
        
        //game.paused = true;
    }

}

function actionOnClick () {

    this.game.state.restart();
    timeCount.text = timeLimit;
    game.time.reset();

}

function sombreroAtrapaRandom (sombrero,objeto) {
    objeto.kill();

    //  Increase the score
    score += 0;
    scoreText.text = scoreString + score;
}

function sombreroAtrapaPower (sombrero,objeto) {
    objeto.kill();
    take_power_sound.play();
    if(powerCount < 5){
            powerCount++;
            this.game.add.sprite(10, 350, 'power'+powerCount);
    }
}

function sombreroAtrapaCalavera (sombrero,objeto) {
    objeto.kill();
    sonido_calavera.play();
    //  Increase the score
    score -= 5;
    scoreText.text = scoreString + score;

}

function sombreroAtrapaObjetoAgua (sombrero,objeto) {
    objeto.kill();

    //  Increase the score
    score += 5;
    scoreText.text = scoreString + score;

}

function sombreroAtrapaObjetoFuego (sombrero,objeto) {
    objeto.kill();

    //  Increase the score
    score += 5;
    scoreText.text = scoreString + score;

}

function sombreroAtrapaMoneda (sombrero,objeto) {
    objeto.kill();
    sonido_moneda.play();
    //  Increase the score
    score += 1;
    scoreText.text = scoreString + score;

}

// Follower constructor
var Follower = function(game, x, y, target) {
    Phaser.Sprite.call(this, game, x, y, 'sombrero');

    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.55, 0.5);

    

    // Enable physics on this object
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds=true;
    // Define constants that affect motion
    this.MAX_SPEED = 500; // pixels/second
    this.MIN_DISTANCE = 15; // pixels
};

// Followers are a type of Phaser.Sprite
Follower.prototype = Object.create(Phaser.Sprite.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.update = function() {
    // Calculate distance to target
    var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

    // If the distance > MIN_DISTANCE then move
    if (distance > this.MIN_DISTANCE) {
        // Calculate the angle to the target
        var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }
};

var game = new Phaser.Game(810, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);