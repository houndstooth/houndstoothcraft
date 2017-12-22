export {
	shouldRefreshCanvas,
	standardAnimation,
} from './animation'
export {
	parseColor,

	BLACK,
	BLUE,
	CYAN,
	GREEN,
	MAGENTA,
	RED,
	TRANSPARENT,
	WHITE,
	YELLOW,

	AssignmentMode,
	ColorOptions,
	ColorSet,
	ShapeColorIndex,
	Supertile,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Weave,
} from './color'
export {
	grid,

	Address,
	AddressElement,
	Grid,
	Referenced,
	ReferencedAddress,
} from './grid'
export {
	perStripe,
	rotateCoordinate,

	Coordinate,
	GetStripePosition,
	GetStripePositions,
	Outline,
	Radian,
	StripeCountMode,
	StripePosition,
} from './stripe'
export {
	solid,

	ComponentParams,
	ExecuteTextureParams,
} from './texture'
export {
	tile,

	TileOriginAndSize,
	Unit,
} from './tile'
export {
	applyViewForShape,
} from './view'

import * as initializePatternState from './initializePatternState'
export {
	initializePatternState,
}
export { patternState } from './patternState'

export {
	FunctionsOf,
	Overwrite,
	FullPatternBaseValues,
	PatternBaseValues,
	PatternFunctions,
} from './types'
export {
	DEFAULT_PATTERN_STATE,
} from './defaults'
export {
	HALF,
	PERIMETER_SCALAR,
} from './constants'
