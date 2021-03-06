// tslint:disable:max-file-line-count no-reaching-imports

export {
	animation,
	appendOverride,
	appState,
	executeTile,
	attachHandlers,
	callFunctionsPerSetting,
	cancelCurrentPattern,
	checkSettingForConflict,
	clearAnimationIntervalAndRemoveFromState,
	clearContext,
	clearContexts,
	clearMixedDownContext,
	clipPath,
	combineEffects,
	completeLayers,
	composeMainHoundstooth,
	composePatterns,
	concatFullSettingPath,
	createCheckbox,
	createContext,
	createContexts,
	createDescription,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	createOverrideClear,
	createOverrideLeafNode,
	createOverrideNodes,
	createOverrideId,
	createOverrideLeaf,
	createOverrideParent,
	createPath,
	deeperPath,
	effectsHaveConflicts,
	effectToggleHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeAnimation,
	executeGrid,
	executeLayer,
	executePattern,
	executeEffect,
	fill,
	fillPath,
	formatSetting,
	frameInputHandler,
	getCurrentContext,
	getCurrentFrame,
	getCurrentLayer,
	getEffectSetting,
	getOverrideLeafNode,
	getOverrideParentNode,
	getPatternSettingOrCreatePath,
	grid,
	overrideClearHandler,
	overrideInputHandler,
	initializeCurrentPatternFromBasePattern,
	isParentOfAnyOverridingChildren,
	mainHoundstoothHasAnimations,
	mapOverPattern,
	mixDownContexts,
	parseOverrideId,
	patternsHaveConflicts,
	pauseHandler,
	playHandler,
	prepareFunctionObjectsPerSetting,
	resetClip,
	resetMainHoundstooth,
	rewindHandler,
	resolveGrid,
	saveBlobThroughAnchor,
	saveCanvas,
	setClip,
	setupAvailableEffects,
	setupMixedDownContext,
	setupRenderStyle,
	snapshotHandler,
	startUp,
	startUpApp,
	storeDomElements,
	thisPatternHasNotBeenCanceled,
	toggleOverrideParentOpen,
	updateAnimatingState,
	updateCurrentFrame,
	updateDescriptions,
	updateOverrides,
	updateOverrideLeafNode,
	updateOverrideNodes,
	updateProgress,

	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_APP_STATE,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	ERASE,

	AnimationParams,
	AppendOverrideParams,
	CheckSettingForConflictParams,
	ComposePatternsParams,
	CreateOverrideParams,
	CreateOverrideTextParams,
	Dimensions,
	ExecuteLayerParams,
	ExecuteParams,
	FullSettingPath,
	GetEffectSetting,
	MapOverPatternParams,
	OverrideLeafNode,
	OverrideNode,
	OverrideOptions,
	OverrideParentNode,
	Path,
	PatternIdAsParam,
	PatternMapFunctionParams,
	PatternsHaveConflictsParams,
	Pixel,
	PrepareFunctionObjectsParams,
	Px,
	ExecuteTileParams,
	SettingFunctionObject,
	SettingPath,
	DeeperPathParams,
	SettingStep,
} from './app/indexForTest'
export {
	animationSettings,
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
	getStandardTileOriginAndSize,
	getStripePositionsForTile,
	getAddresses,
	gridSettings,
	initializePatternState,
	isTileUniform,
	layerSettings,
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
	textureSettings,
	tile,
	tileSettings,
	viewSettings,

	BLACK,
	BLUE,
	CYAN,
	GREEN,
	MAGENTA,
	RED,
	TRANSPARENT,
	WHITE,
	YELLOW,
	DEFAULT_PATTERN_STATE,
	PERIMETER_SCALAR,

	Address,
	AddressAsParam,
	AssignmentMode,
	BaseStripeDiagonal,
	ColorSet,
	ComponentParams,
	Coordinate,
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
	RotateCoordinateParams,
	ShapeColorIndex,
	ShapeParams,
	SolidParams,
	StripeCountMode,
	StripePosition,
	StripePositionSettings,
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
	ObjectOf,
	to,
} from './utilities/indexForTest'

export {
	CANVAS_SIZE,
} from './constants'
export {
	Color,
	Effect,
	Frame,
	Layer,
	NamedEffect,
	Pattern,
} from './types'
