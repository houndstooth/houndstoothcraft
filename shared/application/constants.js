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

export {
	STANDARD_SUPERTILE,
	MINOR_DIAGONAL_OFFSET,
	PRINCIPAL_DIAGONAL_OFFSET,
	TILE_TYPE_TO_COLORS_MAPPING
}
