// tslint:disable:max-file-line-count no-reaching-imports

export {
	animationSettings,
	Frame,
	shouldRefreshCanvas,
} from './animation/indexForTest'
export {
	AssignmentMode,
	Color,
	getColor,
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
	getBySupertile,
	getByWeave,
	OffsetAddress,
	getShapeColorIndices,
	isTileUniform,
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndices,
} from './color/indexForTest'
export {
	Address,
	AddressElement,
	Grid,
	gridSettings,
	Unit,
	grid,
	Referenced,
	ReferencedGridAddress,
} from './grid/indexForTest'
export {
	Layer,
	layerSettings,
} from './layer/indexForTest'
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
	getStripePositionsForTile,
	squareOutline,
	OutlineOptions,
	stripeOutline,
	BaseStripeDiagonal,
	RotateCoordinateParams,
	GetOutline,
	GetStripeOutline,
} from './stripe/indexForTest'
export {
	ComponentParams,
	ExecuteTexture,
	ExecuteTextureParams,
	solid,
	SolidParams,
	textureSettings,
	texture,
	shape,
	ShapeParams,
	TextureParams,
} from './texture/indexForTest'
export {
	tileCenter,
	TileOriginAndSize,
	tileSettings,
	maybeTile,
	getTileOriginAndSize,
	GetTileOriginAndSize,
	tile,
	DefinedTileParams,
} from './tile/indexForTest'
export {
	applyViewForShape,
	viewSettings,
	applyViewForGrid,
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyZoom,
} from './view/indexForTest'

import * as initializePatternState from './initializePatternState'
import * as patternState from './patternState'
export { patternState, initializePatternState }

export {
	BasePattern,
	Effect,
	Houndstooth,
	NamedEffect,
	Pattern,
	PatternFunctions,
	SettingsNamesByTypeBase,
	SettingsNamesToTypesMap,
	SettingsNamesByType,
} from './types'
