// tslint:disable:max-file-line-count no-reaching-imports

export {
	effectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	frameInputChangeHandler,
	getCurrentFrame,
	overrideHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	updateCurrentFrame,
	updateDescriptions,
} from './controls/indexForTest'
export {
	appendOverrideNode,
	attachControlHandlers,
	createCheckbox,
	createContext,
	createContexts,
	createDescription,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	createOverrideLeaf,
	createOverrideParent,
	formatSetting,
	saveBlobThroughAnchor,
	storeDomElements,
	updateOverrides,

	AppendOverrideNodeParams,
	CreateOverrideParams,
	Dimensions,
	OverrideOptions,
	Px,
} from './dom/indexForTest'
export {
	animator,
	asyncMaybeTile,
	buildAnimationFunction,
	buildAnimationIntervalFunction,
	callFunctionsPerSetting,
	cancelPreviousPattern,
	clearIntervalAndRemoveFromState,
	completeLayers,
	executeAnimation,
	executeGrid,
	executeGridAndMaybeLogging,
	executeLayer,
	executePattern,
	executeSelectedEffects,
	getCurrentLayer,
	gridComplete,
	gridProgressIntervalFunction,
	incrementTilesCompleted,
	previousFrameHasFinished,
	setTileCount,
	thisPatternHasNotBeenCanceled,
	updateProgress,

	AnimationParams,
	ExecuteLayerParams,
	ExecuteParams,
} from './execute/indexForTest'
export {
	buildFill,
	buildPath,
	clearContext,
	clearContexts,
	clearMixedDownContext,
	clipPath,
	fill,
	fillPath,
	getCurrentContext,
	mixDownContexts,
	resetClip,
	saveCanvas,
	setClip,
	setupMixedDownContext,

	ERASE,

	Path,
	Pixel,
} from './render/indexForTest'
export {
	checkSettingForConflict,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	deeperPath,
	effectsHaveConflicts,
	getPatternSettingOrCreatePath,
	initializeCurrentPatternFromBasePattern,
	mapOverPattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
	resetMainHoundstooth,
	settingPath,
	setupAvailableEffects,
	shouldRecurse,

	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,

	CheckSettingForConflict,
	ComposePatternsParams,
	FullSettingsPath,
	MapOverPatternParams,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingsFunction,
	SettingsFunctionObject,
	SettingsPath,
	SettingsStep,
} from './settings/indexForTest'
export { appState } from './appState'
export {
	AppState,
} from './types'
import * as startUp from './startUp'
export {
	startUp,
}
export {
	DEFAULT_APP_STATE,
} from './defaults'
