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
	MAX_RADIUS: 13
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
 * isRising: boolean
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
// define enimies
 let enemies;
 let nextEnemies;
 //define bubble
let bubble;

function update() {
	/**----------Init function START!----------**/

	if (!ticks) {
		// init enemies
		enemies = [];
		nextEnemies = 99;
		// Init player
		player = {
			pos: vec(20, G.HEIGHT - 50),
			isRising: false
		}

		// Init radius
		radius = G.MINIMUM_RADIUS;

	}
	//create a difficulty aspect
	const scr = sqrt(difficulty);

	/**----------Update function START!----------**/

	// Draw player
	color("black");
	char('a', player.pos);
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
	// enemy spawner
	nextEnemies -= scr;
	if (nextEnemies < 0) {
		enemies.push({pos: vec(105,rnd(5,95)), vx: rnd(2, difficulty) * 0.3});
		nextEnemies += rnd(100, 110) / sqrt(difficulty);
	};
	color("black");
	remove(enemies, (a) => {
		a.pos.x -= a.vx +scr;
		const e = char("b", a.pos).isColliding.char;
		addScore(1);
		if (e.a || e.a) {
			play("explosion");
			end();
			return true;
		}
		return a.pos.x <-3;
	});

}