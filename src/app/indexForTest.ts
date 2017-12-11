// tslint:disable:max-file-line-count no-reaching-imports

export {
	clearContext,
	clearContexts,
	clearMixedDownContext,
	exportCanvas,
	getCurrentContext,
	mixDownContexts,
	saveCanvas,

	DataBlob,
} from './canvas/indexForTest'
export {
	buildEffectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	frameInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	updateCurrentFrame,
	updateDescriptions,
} from './controls/indexForTest'
export {
	addDescription,
	attachControlHandlers,
	createCheckbox,
	createContext,
	createContexts,
	createEffectToggle,
	createEffectToggles,
	createLabel,
	makeId,
	saveBlob,
	scaleCanvasContainer,
	scaleElement,
	storeDomElements,
	storeMixedDownContext,

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
	clearInterval,
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
	standardAnimation,
	thisPatternHasNotBeenCanceled,
	updateProgress,

	AnimationParams,
	ExecuteLayerParams,
	ExecuteParams,
} from './execute/indexForTest'
export {
	buildFill,
	buildPath,
	clipPath,
	fill,
	fillPath,
	resetClip,
	setClip,

	Path,
	Pixel,
} from './render/indexForTest'
export {
	buildSettingNamesToPathsMap,
	checkSettingForConflict,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	deeperPath,
	effectsHaveConflicts,
	getPatternSettingOrCreatePath,
	getSettingsPath,
	initializeCurrentPatternFromBasePattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
	resetMainHoundstooth,
	settingPath,
	shouldRecurse,

	BuildSettingNamesToPathsMapParams,
	CheckSettingForConflict,
	ComposeMainHoundstoothParams,
	ComposePatternsParams,
	FullSettingsPath,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingNamesToPathsMap,
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
