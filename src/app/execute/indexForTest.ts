import * as animator from './animator'
import * as asyncMaybeTile from './asyncMaybeTile'
import * as buildAnimationFunction from './buildAnimationFunction'
import * as buildAnimationIntervalFunction from './buildAnimationIntervalFunction'
import * as callFunctionsPerSetting from './callFunctionsPerSetting'
import * as cancelPreviousPattern from './cancelPreviousPattern'
import * as clearIntervalAndRemoveFromState from './clearIntervalAndRemoveFromState'
import * as completeLayers from './completeLayers'
import * as executeAnimation from './executeAnimation'
import * as executeFrame from './executeFrame'
import * as executeGrid from './executeGrid'
import * as executeGridAndMaybeLogging from './executeGridAndMaybeLogging'
import * as executeLayer from './executeLayer'
import * as executePattern from './executePattern'
import * as getCurrentLayer from './getCurrentLayer'
import * as gridComplete from './gridComplete'
import * as gridProgressIntervalFunction from './gridProgressIntervalFunction'
import * as incrementTilesCompleted from './incrementTilesCompleted'
import * as previousFrameHasFinished from './previousFrameHasFinished'
import * as setTileCount from './setTileCount'
import * as thisFrameHasNotBeenCanceled from './thisFrameHasNotBeenCanceled'
import * as updateProgress from './updateProgress'

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
	executeFrame,
	executePattern,
	getCurrentLayer,
	gridComplete,
	gridProgressIntervalFunction,
	incrementTilesCompleted,
	previousFrameHasFinished,
	setTileCount,
	thisFrameHasNotBeenCanceled,
	updateProgress,
}
export {
	AnimationParams,
	ExecuteLayerParams,
	ExecuteParams,
} from './types'
