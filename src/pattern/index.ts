// tslint:disable:max-file-line-count

export {
	animationSettings,
	Frame,
	standardAnimation,
	shouldRefreshCanvas,
} from './animation'
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
	getStripePositionsForTile,
	squareOutline,
	OutlineOptions,
	stripeOutline,
	BaseStripeDiagonal,
	RotateCoordinateParams,
	GetOutline,
	GetStripeOutline,
} from './stripe'
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
} from './texture'
export {
	tileCenter,
	TileOriginAndSize,
	tileSettings,
	maybeTile,
	getTileOriginAndSize,
	GetTileOriginAndSize,
	tile,
	DefinedTileParams,
} from './tile'
export {
	applyViewForShape,
	viewSettings,
	applyViewForGrid,
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyZoom,
} from './view'

import * as patternState from './patternState'
export { patternState }

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
