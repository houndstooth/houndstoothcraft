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
	buildSettingNamesToPathsMap,
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
	getSettingsPath,
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

	AnimationParams,
	BuildSettingNamesToPathsMapParams,
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
	SettingNamesToPathsMap,
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

	Address,
	AssignmentMode,
	BaseStripeDiagonal,
	Color,
	ColorSet,
	ComponentParams,
	Coordinate,
	DefinedTileParams,
	Effect,
	ExecuteTexture,
	ExecuteTextureParams,
	Frame,
	GetOutline,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	GetStripeOutline,
	GetStripePosition,
	GetStripePositions,
	GetTileOriginAndSize,
	Grid,
	Layer,
	NamedEffect,
	OffsetAddress,
	Outline,
	OutlineOptions,
	Pattern,
	PatternFunctions,
	Radian,
	ReferencedGridAddress,
	RotateCoordinateParams,
	SettingsNamesByType,
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
import * as defaults from './defaults'
export {
	constants,
	defaults,
}
