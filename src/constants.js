const BLACK = { r: 0, g: 0, b: 0, a: 1 }
const WHITE = { r: 255, g: 255, b: 255, a: 1 }
const RED = { r: 255, g: 0, b: 0, a: 1 }
const GREEN = { r: 0, g: 255, b: 0, a: 1 }
const BLUE = { r: 0, g: 0, b: 255, a: 1 }
const CYAN = { r: 0, g: 255, b: 255, a: 1 }
const MAGENTA = { r: 255, g: 0, b: 255, a: 1 }
const YELLOW = { r: 255, g: 255, b: 0, a: 1 }

const TRANSPARENT = { a: 0 }
const ERASE = { a: -1 }

const EIGHTH_OF_CIRCLE_ROTATION = Math.PI / 4
const QUARTER_OF_CIRCLE_ROTATION = Math.PI / 2

const PERIMETER_SCALAR = 2

const ANIMATION_RATE = 1.000005

export {
	PERIMETER_SCALAR,
	ANIMATION_RATE,
	BLACK,
	WHITE,
	RED,
	GREEN,
	BLUE,
	CYAN,
	MAGENTA,
	YELLOW,
	TRANSPARENT,
	ERASE,
	EIGHTH_OF_CIRCLE_ROTATION,
	QUARTER_OF_CIRCLE_ROTATION,
}
