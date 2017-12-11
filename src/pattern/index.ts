export {
	animationSettings,
	Frame,
	shouldRefreshCanvas,
} from './animation'
export {
	AssignmentMode,
	Color,
	colorAssignmentSettings,
	ColorOptions,
	ColorSet,
	colorSettings,
	parseColor,
	ShapeColorIndex,
	Supertile,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Weave,
} from './color'
export {
	Address,
	AddressElement,
	Grid,
	gridSettings,
	Unit,
	grid,
	Referenced,
	ReferencedGridAddress,
} from './grid'
export {
	Layer,
	layerSettings,
} from './layer'
export {
	Coordinate,
	GetStripePosition,
	GetStripePositions,
	Outline,
	perStripe,
	Radian,
	rotateCoordinate,
	stripeCountContinuumSettings,
	StripeCountMode,
	StripePosition,
	stripePositionSettings,
	stripeSettings,
} from './stripe'
export {
	ComponentParams,
	ExecuteTextureParams,
	solid,
	textureSettings,
} from './texture'
export {
	TileOriginAndSize,
	tileSettings,
	maybeTile,
} from './tile'
export {
	applyViewForShape,
	viewSettings,
} from './view'

import * as initializePatternState from './initializePatternState'
import * as patternState from './patternState'
export {
	patternState,
	initializePatternState
}

export {
	BasePattern,
	Effect,
	Houndstooth,
	NamedEffect,
	Pattern,
	PatternFunctions,
} from './types'
