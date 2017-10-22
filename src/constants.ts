// tslint:disable:no-magic-numbers

import { Color } from './render'
import { Radian } from './space'
import * as to from './utilities/to'

const BLACK: Color = to.Color({ r: 0, g: 0, b: 0, a: 1 })
const WHITE: Color = to.Color({ r: 255, g: 255, b: 255, a: 1 })
const RED: Color = to.Color({ r: 255, g: 0, b: 0, a: 1 })
const GREEN: Color = to.Color({ r: 0, g: 255, b: 0, a: 1 })
const BLUE: Color = to.Color({ r: 0, g: 0, b: 255, a: 1 })
const CYAN: Color = to.Color({ r: 0, g: 255, b: 255, a: 1 })
const MAGENTA: Color = to.Color({ r: 255, g: 0, b: 255, a: 1 })
const YELLOW: Color = to.Color({ r: 255, g: 255, b: 0, a: 1 })

const TRANSPARENT: Color = to.Color({ a: 0 })
const ERASE: Color = to.Color({ a: -1 })

const EIGHTH_OF_CIRCLE_ROTATION: Radian = to.Radian(Math.PI / 4)
const QUARTER_CIRCLE_ROTATION: Radian = to.Radian(Math.PI / 2)

const HALF = 1 / 2

const PERIMETER_SCALAR = 2

const SQRT_2 = Math.sqrt(2)

const X_INDEX = 0
const Y_INDEX = 1

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
	QUARTER_CIRCLE_ROTATION,
	PERIMETER_SCALAR,
	ANIMATION_RATE,
	SQRT_2,
	X_INDEX,
	Y_INDEX,
	HALF,
}
