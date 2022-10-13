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
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 100,
	MINIMUM_RADIUS: 8,
	FALL_SPEED: 0.1,
	RISE_SPEED: 0.4
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


function update() {
	/**----------Init function START!----------**/

	if (!ticks) {
		// Init player
		player = {
			pos: vec(20, G.HEIGHT - 50),
			isRising: false
		}
	}

	/**----------Update function START!----------**/

	// Draw player
	color("black");
	char('a', player.pos);

	// Draw circle around player
	color("light_cyan");
	arc(player.pos.x, player.pos.y, G.MINIMUM_RADIUS, 1, 0 , 360);

	// Make player constantly fall towards the bottom of the screen
	player.pos.y += G.FALL_SPEED;

	// If mouse click is held, player rises
	if (pointer.isPressed) {
		player.pos.y -= G.RISE_SPEED;
	}
}
