// tslint:disable:max-file-line-count no-reaching-imports

export {
	animationSettings,
	shouldRefreshCanvas,

	Frame,
} from './animation/indexForTest'
export {
	colorAssignmentSettings,
	colorSettings,
	getBySupertile,
	getByWeave,
	getColor,
	getShapeColorIndices,
	isTileUniform,
	parseColor,

	AssignmentMode,
	Color,
	ColorSet,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	OffsetAddress,
	ShapeColorIndex,
	Supertile,
	TransformShapeColorIndices,
	Weave,
} from './color/indexForTest'
export {
	grid,
	gridSettings,

	Address,
	Grid,
	GridAddressParam,
	Referenced,
	ReferencedGridAddress,
	Unit,
} from './grid/indexForTest'
export {
	layerSettings,

	Layer,
} from './layer/indexForTest'
export {
	getStripePositionsForTile,
	perStripe,
	rotateCoordinate,
	squareOutline,
	stripeCountContinuumSettings,
	stripeOutline,
	stripePositionSettings,
	stripeSettings,

	BaseStripeDiagonal,
	Coordinate,
	GetOutline,
	GetOutlineParams,
	GetStripeArgsParams,
	GetStripeOutline,
	GetStripePosition,
	GetStripePositions,
	Outline,
	OutlineAsParam,
	OutlineOptions,
	Radian,
	StripeCountMode,
	StripePosition,
	RotateCoordinateParams,
} from './stripe/indexForTest'
export {
	shape,
	solid,
	texture,
	textureSettings,

	ComponentParams,
	ExecuteTexture,
	ExecuteTextureParams,
	ShapeArgs,
	ShapeParams,
	SolidParams,
	TextureParams,
} from './texture/indexForTest'
export {
	getTileOriginAndSize,
	maybeTile,
	tile,
	tileCenter,
	tileSettings,

	DefinedTileParams,
	GetTileOriginAndSize,
	TileOriginAndSize,
} from './tile/indexForTest'
export {
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyViewForGrid,
	applyViewForShape,
	applyZoom,
	viewSettings,
} from './view/indexForTest'

import * as initializePatternState from './initializePatternState'
import * as patternState from './patternState'
export {
	initializePatternState,
	patternState,
}

export {
	BasePattern,
	Effect,
	Houndstooth,
	NamedEffect,
	Pattern,
	PatternFunctions,
	SettingsNamesByType,
	SettingsNamesByTypeBase,
	SettingsNamesToTypesMap,
} from './types'
