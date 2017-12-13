// tslint:disable:max-file-line-count no-reaching-imports

export {
	animationSettings,
	standardAnimation,
	shouldRefreshCanvas,
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
	AddressAsParam,
	Referenced,
	ReferencedAddress,
} from './grid/indexForTest'
export {
	layerSettings,
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
	OutlineOptions,
	Radian,
	StripeCountMode,
	StripePosition,
	RotateCoordinateParams,
} from './stripe/indexForTest'
export {
	shape,
	solid,
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
	getStandardTileOriginAndSize,
	maybeTile,
	tile,
	tileSettings,

	DefinedTileParams,
	GetTileOriginAndSize,
	TileOriginAndSize,
	Unit,
} from './tile/indexForTest'
export {
	applyScroll,
	applyTilt,
	applyViewForGrid,
	applyViewForShape,
	applyZoom,
	viewSettings,
} from './view/indexForTest'

import * as initializePatternState from './initializePatternState'
export {
	initializePatternState,
}
export { patternState } from './patternState'
export {
	DEFAULT_PATTERN_STATE,
} from './defaults'
export {
	PatternFunctions,
} from './types'
export {
	PERIMETER_SCALAR,
} from './constants'
