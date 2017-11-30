// tslint:disable:max-file-line-count

export {
	animationSettings,
	animator,
	ConditionFunction,
	executeAnimation,
	Frame,
	standardAnimation,
	buildIntervalFunction,
	buildAnimationFunction,
	buildStopConditionFunction,
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
} from './color'
import * as executePattern from './executePattern'
export {
	Address,
	AddressElement,
	Grid,
	gridSettings,
	Unit,
	grid,
	executeGridAndMaybeLogging,
	buildGridProgressIntervalFunction,
	executeGrid,
	gridComplete,
} from './grid'
export { Layer, layerSettings, executeLayer, ExecuteLayerParams } from './layer'
export { settingsNamesToPathsMap } from './settingsNamesToPathsMap'
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
} from './texture'
export {
	tileCenter,
	TileOriginAndSize,
	tileSettings,
	asyncMaybeTile,
	maybeTile,
	getTileOriginAndSize,
	GetTileOriginAndSize,
	tile,
} from './tile'
export {
	BasePattern,
	Effect,
	Houndstooth,
	Pattern,
	PatternFunctions,
	SetSetting,
	SettingsNamesByTypeBase,
	SettingsNamesToTypesMap,
} from './types'
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

export {
	executePattern,
}
