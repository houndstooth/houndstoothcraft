import { Color } from './render'

const BLACK: Color = { r: 0, g: 0, b: 0, a: 1 }
const WHITE: Color = { r: 255, g: 255, b: 255, a: 1 }
const RED: Color = { r: 255, g: 0, b: 0, a: 1 }
const GREEN: Color = { r: 0, g: 255, b: 0, a: 1 }
const BLUE: Color = { r: 0, g: 0, b: 255, a: 1 }
const CYAN: Color = { r: 0, g: 255, b: 255, a: 1 }
const MAGENTA: Color = { r: 255, g: 0, b: 255, a: 1 }
const YELLOW: Color = { r: 255, g: 255, b: 0, a: 1 }

const TRANSPARENT: Color = { a: 0 }
const ERASE: Color = { a: -1 }

const EIGHTH_OF_CIRCLE_ROTATION: number = Math.PI / 4

const PERIMETER_SCALAR = 2

const ANIMATION_RATE = 1.000005

export {
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
	PERIMETER_SCALAR,
	ANIMATION_RATE,
}
