// tslint:disable:no-reaching-imports

import * as callFunctionsPerSetting from './callFunctionsPerSetting'
import * as cancelCurrentPattern from './cancelCurrentPattern'
import * as executeEffect from './executeEffect'
import * as executePattern from './executePattern'
import * as thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'

export {
	callFunctionsPerSetting,
	cancelCurrentPattern,
	executePattern,
	executeEffect,
	thisPatternHasNotBeenCanceled,
}
export {
	animation,
	clearAnimationIntervalAndRemoveFromState,
	executeAnimation,

	AnimationParams,
} from './animation/indexForTest'
export {
	asyncMaybeTile,
	executeGrid,
	executeGridAndMaybeLogging,
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
