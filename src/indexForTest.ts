// tslint:disable:max-file-line-count no-reaching-imports

export {
	animator,
	appState,
	asyncMaybeTile,
	attachControlHandlers,
	buildAnimationFunction,
	buildAnimationIntervalFunction,
	buildEffectToggleClickHandler,
	buildFill,
	buildPath,
	callFunctionsPerSetting,
	cancelPreviousPattern,
	checkSettingForConflict,
	clearContext,
	clearContexts,
	clearIntervalAndRemoveFromState,
	clearMixedDownContext,
	clipPath,
	combineEffects,
	completeLayers,
	composeMainHoundstooth,
	composePatterns,
	createCheckbox,
	createContext,
	createContexts,
	createDescription,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	deeperPath,
	effectsHaveConflicts,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeAnimation,
	executeGrid,
	executeGridAndMaybeLogging,
	executeLayer,
	executePattern,
	executeSelectedEffects,
	exportCanvas,
	fill,
	fillPath,
	frameInputChangeHandler,
	getCurrentContext,
	getCurrentFrame,
	getCurrentLayer,
	getPatternSettingOrCreatePath,
	gridComplete,
	gridProgressIntervalFunction,
	incrementTilesCompleted,
	initializeCurrentPatternFromBasePattern,
	makeId,
	mixDownContexts,
	patternsHaveConflicts,
	pauseClickHandler,
	playClickHandler,
	prepareFunctionObjectsPerSetting,
	previousFrameHasFinished,
	resetClip,
	resetMainHoundstooth,
	rewindClickHandler,
	saveBlob,
	saveCanvas,
	setClip,
	setTileCount,
	settingPath,
	setupMixedDownContext,
	shouldRecurse,
	snapshotClickHandler,
	startUp,
	storeDomElements,
	thisPatternHasNotBeenCanceled,
	updateCurrentFrame,
	updateDescriptions,
	updateProgress,

	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_APP_STATE,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,

	AnimationParams,
	CheckSettingForConflict,
	ComposeMainHoundstoothParams,
	ComposePatternsParams,
	DataBlob,
	Dimensions,
	ExecuteLayerParams,
	ExecuteParams,
	FullSettingsPath,
	Path,
	PatternsHaveConflictsParams,
	Pixel,
	PrepareFunctionObjectsParams,
	Px,
	SettingsFunctionObject,
	SettingsPath,
	SettingsStep,
} from './app/indexForTest'
export {
	animationSettings,
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyViewForGrid,
	applyViewForShape,
	applyZoom,
	colorAssignmentSettings,
	colorSettings,
	getBySupertile,
	getByWeave,
	getColor,
	getShapeColorIndices,
	getStripePositionsForTile,
	getTileOriginAndSize,
	grid,
	gridSettings,
	initializePatternState,
	isTileUniform,
	layerSettings,
	maybeTile,
	parseColor,
	patternState,
	perStripe,
	rotateCoordinate,
	shape,
	shouldRefreshCanvas,
	solid,
	squareOutline,
	standardAnimation,
	stripeCountContinuumSettings,
	stripeOutline,
	stripePositionSettings,
	stripeSettings,
	texture,
	textureSettings,
	tile,
	tileCenter,
	tileSettings,
	viewSettings,

	DEFAULT_PATTERN_STATE,

	Address,
	AssignmentMode,
	BaseStripeDiagonal,
	Color,
	ColorSet,
	ComponentParams,
	Coordinate,
	DefinedTileParams,
	ExecuteTexture,
	ExecuteTextureParams,
	GetOutline,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	GetStripeOutline,
	GetStripePosition,
	GetStripePositions,
	GetTileOriginAndSize,
	Grid,
	OffsetAddress,
	Outline,
	OutlineOptions,
	PatternFunctions,
	Radian,
	ReferencedGridAddress,
	RotateCoordinateParams,
	ShapeColorIndex,
	ShapeParams,
	SolidParams,
	StripeCountMode,
	StripePosition,
	Supertile,
	TextureParams,
	TileOriginAndSize,
	TransformShapeColorIndices,
	Unit,
	Weave,
} from './pattern/indexForTest'
export {
	codeUtilities,
	from,
	globalWrapper,
	mathUtilities,
	to,

	ConditionFunction,
	NullarySideEffector,
	NullaryVoidPromise,
} from './utilities/indexForTest'

import * as constants from './constants'
export {
	constants,
}
export {
	Effect,
	Frame,
	Layer,
	NamedEffect,
	Pattern,
} from './types'
