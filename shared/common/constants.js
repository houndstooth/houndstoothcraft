import { CANVAS_SIZE, COLOR_A, COLOR_B } from './customize'

const CENTER = [ CANVAS_SIZE / 2, CANVAS_SIZE / 2 ]

const STANDARD_SUPERTILE = [
	[
		{
			originColor: COLOR_A,
			otherColor: COLOR_A
		},
		{
			originColor: COLOR_B,
			otherColor: COLOR_A
		}
	],
	[
		{
			originColor: COLOR_A,
			otherColor: COLOR_B
		},
		{
			originColor: COLOR_B,
			otherColor: COLOR_B
		}
	]
]

const SQUARE_TYPE_TO_COLORS_MAPPING = {
	"SOLID_A": {
		originColor: COLOR_A,
		otherColor: COLOR_A
	},
	"SOLID_B": {
		originColor: COLOR_B,
		otherColor: COLOR_B
	},
	"STRIPED_A": {
		originColor: COLOR_A,
		otherColor: COLOR_B
	},
	"STRIPED_B": {
		originColor: COLOR_B,
		otherColor: COLOR_A
	}
}

const SWITCHEROO_SUPERTILE = [
	[
		"STRIPED_A",
		COLOR_A,
		"STRIPED_B",
		COLOR_A
	],
	[
		COLOR_B,
		"STRIPED_A",
		COLOR_B,
		"STRIPED_B"
	],
	[
		"STRIPED_B",
		COLOR_A,
		"STRIPED_A",
		COLOR_A
	],
	[
		COLOR_B,
		"STRIPED_B",
		COLOR_B,
		"STRIPED_A"
	]
]

const MINOR_DIAGONAL_OFFSET = 0
const PRINCIPAL_DIAGONAL_OFFSET = Math.PI / 2

export {
	CENTER,
	STANDARD_SUPERTILE,
	SWITCHEROO_SUPERTILE,
	MINOR_DIAGONAL_OFFSET,
	PRINCIPAL_DIAGONAL_OFFSET,
	SQUARE_TYPE_TO_COLORS_MAPPING
}