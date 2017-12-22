// tslint:disable:no-reaching-imports

import * as callFunctionsPerSetting from './callFunctionsPerSetting'

export {
	callFunctionsPerSetting,
}
export {
	animation,
	clearAnimationIntervalAndRemoveFromState,
	executeAnimation,

	AnimationParams,
} from './animation/indexForTest'
export {
	executeEffect,
} from './effect/indexForTest'
export {
	executeGrid,
} from './grid/indexForTest'
export {
	completeLayers,
	executeLayer,
	getCurrentLayer,

	ExecuteLayerParams,
} from './layer/indexForTest'
export {
	cancelCurrentPattern,
	executePattern,
	thisPatternHasNotBeenCanceled,
} from './pattern/indexForTest'
export {
	executeTile,
	incrementTilesCompleted,
	setTileCount,
	updateProgress,
} from './tile/indexForTest'
export {
	ExecuteParams,
} from './types'
