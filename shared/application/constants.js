const STANDARD_SUPERTILE = [
	[ "STRIPED_B", "SOLID_A" ],
	[ "SOLID_B", "STRIPED_A" ]
]

const TILE_TYPE_TO_COLORS_MAPPING = {
	"SOLID_A": [ 'colorA', 'colorA' ],
	"SOLID_B": [ 'colorB', 'colorB' ],
	"STRIPED_A": [ 'colorA', 'colorB' ],
	"STRIPED_B": [ 'colorB', 'colorA' ]
}

const MINOR_DIAGONAL_OFFSET = 0
const PRINCIPAL_DIAGONAL_OFFSET = Math.PI / 2

const BLACK = { 'r': 0, 'g': 0, 'b': 0, 'a': 1 }
const WHITE = { 'r': 255, 'g': 255, 'b': 255, 'a': 1 }
const RED = { 'r': 255, 'g': 0, 'b': 0, 'a': 1 }
const GREEN = { 'r': 0, 'g': 255, 'b': 0, 'a': 1 }
const BLUE = { 'r': 0, 'g': 0, 'b': 255, 'a': 1 }
const CYAN = { 'r': 0, 'g': 255, 'b': 255, 'a': 1 }
const MAGENTA = { 'r': 255, 'g': 0, 'b': 255, 'a': 1 }
const YELLOW = { 'r': 255, 'g': 255, 'b': 0, 'a': 1 }
const TRANSPARENT = { 'a': 0 }

export {
	STANDARD_SUPERTILE,
	MINOR_DIAGONAL_OFFSET,
	PRINCIPAL_DIAGONAL_OFFSET,
	TILE_TYPE_TO_COLORS_MAPPING,
	BLACK,
	WHITE,
	RED,
	GREEN,
	BLUE,
	CYAN,
	MAGENTA,
	YELLOW,
	TRANSPARENT
}
