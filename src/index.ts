// tslint:disable:max-file-line-count

export {
	attachControlHandlers,
	Canvas,
	clearContext,
	clearContexts,
	clearMixedDownContext,
	combineHoundstoothEffects,
	composeMainHoundstooth,
	composePatterns,
	frameInputChangeHandler,
	createLabel,
	createCheckbox,
	Context,
	createContext,
	createEffectToggles,
	executeSelectedHoundstoothEffects,
	getSetting,
	InputElement,
	PageElement,
	Pixel,
	Px,
	resetState,
	scaleCanvasContainer,
	scaleElement,
	checkSettingForConflict,
	CheckSettingForConflict,
	effectsHaveConflicts,
	SettingsFunctionObject,
	prepareFunctionObjectsPerSetting,
	createContexts,
	settingPath,
	SettingsPath,
	SettingsStep,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	buildEffectToggleClickHandler,
	setSetting,
	createEffectToggle,
	LabelElement,
	insertElementRightAfter,
	resetMixedDownContext,
	buildFill,
	Path,
	buildPath,
	clipPath,
	fillPath,
	fill,
	getCurrentContext,
	mixDownContexts,
	resetClip,
	setClip,
	deeperPath,
	getPatternSettingOrCreatePath,
	resetInterface,
	addDescription,
	callFunctionsPerSetting,
	DataBlob,
	exportCanvas,
	saveBlob,
	saveCanvas,
	updateCurrentFrame,
	makeId,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	shouldRecurse,
	PatternsHaveConflictsParams,
	patternsHaveConflicts,
	updateDescriptions,
} from './app'
import * as constants from './constants'
import * as defaults from './defaults'
import * as from from './from'
export {
	Address,
	AddressElement,
	animator,
	AssignmentMode,
	Color,
	ColorOptions,
	ColorSet,
	colorSettings,
	ComponentParams,
	ConditionFunction,
	Coordinate,
	Effect,
	ExecuteTexture,
	ExecuteTextureParams,
	Frame,
	GetStripePosition,
	GetStripePositions,
	Layer,
	NamedEffect,
	PatternFunctions,
	Outline,
	parseColor,
	perStripe,
	previousFrameHasFinished,
	Radian,
	rotateCoordinate,
	ShapeColorIndex,
	solid,
	SolidParams,
	standardAnimation,
	StripeCountMode,
	StripePosition,
	Supertile,
	tileCenter,
	TileOriginAndSize,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Unit,
	Weave,
	Pattern,
	executePattern,
	thisPatternHasNotBeenCanceled,
	executeAnimation,
	applyViewForShape,
	executeGridAndMaybeLogging,
	buildIntervalFunction,
	buildAnimationFunction,
	grid,
	executeLayer,
	getBySupertile,
	getByWeave,
	getColor,
	OffsetAddress,
	Grid,
	getShapeColorIndices,
	isTileUniform,
	buildGridProgressIntervalFunction,
	executeGrid,
	gridComplete,
	asyncMaybeTile,
	maybeTile,
	applyViewForGrid,
	getStripePositionsForTile,
	stripePositionSettings,
	squareOutline,
	OutlineOptions,
	stripeOutline,
	texture,
	shape,
	getTileOriginAndSize,
	tile,
	GetTileOriginAndSize,
	applyBackgroundColor,
	applyOpacity,
	applyScroll,
	applyTilt,
	applyZoom,
	ExecuteLayerParams,
	updateProgress,
	completeLayers,
} from './pattern'
export { state, DEFAULT_STATE } from './state'
import * as to from './to'
export {
	codeUtilities,
	consoleWrapper,
	documentWrapper,
	mathUtilities,
	noop,
	NullarySideEffector,
	NullaryVoidPromise,
	windowWrapper,
} from './utilities'
export { State } from './types'
import * as availableEffects from './availableEffects'

export {
	to,
	from,
	defaults,
	constants,
	availableEffects,
}
