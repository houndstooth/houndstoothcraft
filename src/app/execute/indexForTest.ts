// tslint:disable:no-reaching-imports

import * as callFunctionsPerSetting from './callFunctionsPerSetting'
import * as cancelCurrentPattern from './cancelCurrentPattern'
import * as clearIntervalAndRemoveFromState from './clearIntervalAndRemoveFromState'
import * as executeEffect from './executeEffect'
import * as executePattern from './executePattern'
import * as thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'

export {
	callFunctionsPerSetting,
	cancelCurrentPattern,
	clearIntervalAndRemoveFromState,
	executePattern,
	executeEffect,
	thisPatternHasNotBeenCanceled,
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
