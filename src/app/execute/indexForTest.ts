import * as callFunctionsPerSetting from './callFunctionsPerSetting'
import * as cancelCurrentFrame from './cancelCurrentFrame'
import * as clearIntervalAndRemoveFromState from './clearIntervalAndRemoveFromState'
import * as executeFrame from './executeFrame'
import * as executePattern from './executePattern'
import * as thisFrameHasNotBeenCanceled from './thisFrameHasNotBeenCanceled'

export {
	callFunctionsPerSetting,
	cancelCurrentFrame,
	clearIntervalAndRemoveFromState,
	executeFrame,
	executePattern,
	thisFrameHasNotBeenCanceled,
}
export {
	animator,
	buildAnimationFunction,
	buildAnimationIntervalFunction,
	executeAnimation,
	previousFrameHasFinished,

	AnimationParams,
} from './animation/indexForTest'
export {
	asyncMaybeTile,
	executeGrid,
	executeGridAndMaybeLogging,
	gridComplete,
	gridProgressIntervalFunction,
	incrementTilesCompleted,
	setTileCount,
	updateProgress,
} from './grid/indexForTest'
export {
	completeLayers,
	executeLayer,
	getCurrentLayer,

	ExecuteLayerParams,
} from './layer/indexForTest'
export {
	ExecuteParams,
} from './types'
