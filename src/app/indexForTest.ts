// tslint:disable:max-file-line-count no-reaching-imports

export {
	effectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	frameInputChangeHandler,
	getCurrentFrame,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	updateCurrentFrame,
	updateDescriptions,
} from './controls/indexForTest'
export {
	attachControlHandlers,
	createCheckbox,
	createContext,
	createContexts,
	createDescription,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	makeId,
	saveBlob,
	storeDomElements,

	Dimensions,
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
	exportCanvas,
	fill,
	fillPath,
	getCurrentContext,
	mixDownContexts,
	resetClip,
	saveCanvas,
	setClip,
	setupMixedDownContext,

	ERASE,

	DataBlob,
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
	ComposeMainHoundstoothParams,
	ComposePatternsParams,
	FullSettingsPath,
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
