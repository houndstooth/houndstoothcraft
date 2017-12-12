export {
	animationSettings,
	shouldRefreshCanvas,
	standardAnimation,

	Frame,
} from './animation'
export {
	colorAssignmentSettings,
	colorSettings,
	parseColor,

	AssignmentMode,
	Color,
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
	gridSettings,

	Address,
	AddressElement,
	Grid,
	Unit,
	Referenced,
	ReferencedGridAddress,
} from './grid'
export {
	layerSettings,

	Layer,
} from './layer'
export {
	perStripe,
	rotateCoordinate,
	stripeCountContinuumSettings,
	stripePositionSettings,
	stripeSettings,

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
	textureSettings,

	ComponentParams,
	ExecuteTextureParams,
} from './texture'
export {
	maybeTile,
	tileSettings,

	TileOriginAndSize,
} from './tile'
export {
	applyViewForShape,
	viewSettings,
} from './view'

import * as initializePatternState from './initializePatternState'
import * as patternState from './patternState'
export {
	initializePatternState,
	patternState,
}

export {
	BasePattern,
	Effect,
	FunctionsOf,
	Houndstooth,
	NamedEffect,
	Overwrite,
	Pattern,
	PatternFunctions,
	SettingsNamesByTypeBase,
} from './types'
export {
	DEFAULT_PATTERN_STATE,
} from './defaults'
