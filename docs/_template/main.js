title = "BUBBLY";

description = `
`;

characters = [
`
  ll
  ll
llccll
  cc
ll  ll
`,`
   L  
  LLL
 LLLLL
LLLLLLL

`, `
rrrrr
rrrrr
rrrrr
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 100,
	MINIMUM_RADIUS: 8,
	FALL_SPEED: 0.1,
	RISE_SPEED: 0.4,
	GROWTH_RATE: 0.1,
	MAX_RADIUS: 13,
	ROTATE_SPEED: 0.05
}

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	isPlayingBgm: true,
	theme: "dark"
};


// Define Player object and player container
/**
 * @typedef {{
 * pos: Vector
 * isRising: boolean,
 * rotation: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

// Define bubble radius
/**
 * @type { number }
 */
 let radius;
 

// define enemies
 let enemies;
 let nextEnemies;
 
 // Define bubble
let bubble;

// Define spike positions
let spike_pos;


function update() {
	/**----------Init function START!----------**/

	if (!ticks) {
		// init enemies
		enemies = [];
		nextEnemies = 99;
		// Init player
		player = {
			pos: vec(20, G.HEIGHT - 50),
			isRising: false,
			rotation: G.ROTATE_SPEED
		}

		// Init radius
		radius = G.MINIMUM_RADIUS;

		// Init spike positions
		spike_pos = [4, 10, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88, 94, 100];

	}
	//create a difficulty aspect
	const scr = sqrt(difficulty);

	/**----------Update function START!----------**/

	// Draw player
	color("black");
	player.rotation += G.ROTATE_SPEED;
	char('a', player.pos, {rotation: player.rotation});
	// Keep player on screen
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

	// Draw circle around player
	color("light_cyan");
	bubble = arc(player.pos.x, player.pos.y, radius, 1, 0 , 360);

	// Make player constantly fall towards the bottom of the screen
	player.pos.y += G.FALL_SPEED;

	// If mouse click is held, player rises and bubble grows
	if (pointer.isPressed && radius < G.MAX_RADIUS) {
		player.pos.y -= G.RISE_SPEED;
		radius += G.GROWTH_RATE;
	}
	// If button is not held, deflate bubble
	else if (radius > G.MINIMUM_RADIUS) {
		radius -= G.GROWTH_RATE;
	}
  
	// Draw spikes at defined positions
	color("light_black");
	for (let i = 0; i < spike_pos.length; i++) {
		char("b", spike_pos[i], 98);
	}

	// Check to see if player hits spikes
	const isCollidingWithPlayer = char("b", 16, 98).isColliding.rect.light_cyan;
	if (isCollidingWithPlayer) {
		end();
		play("powerUp");
	}

	// Check to see if player hits enemy
	const isCollidingWithPlayer2 = char("b", 22, 98).isColliding.rect.light_cyan;
	if (isCollidingWithPlayer2) {
		end();
		play("powerUp");
	}

	// enemy spawner
	nextEnemies -= scr;
	if (nextEnemies < 0) {
		enemies.push({pos: vec(105,rnd(5,95)), vx: rnd(2, difficulty) * 0.3});
		nextEnemies += rnd(20, 30) / sqrt(difficulty);
	};
	color("black");
	remove(enemies, (a) => {
		a.pos.x -= a.vx +scr;

		// If bubble collides with enemy, gamer over!
		const isCollidingWithEnemy = char("c", a.pos).isColliding.rect.light_cyan;
		addScore(1);
		if (isCollidingWithEnemy) {
			play("explosion");
			end();
			return true;
		}
		return a.pos.x <-3;
	});
}
