import * as animationSettings from './animationSettings'
import * as animator from './animator'
import * as buildAnimationFunction from './buildAnimationFunction'
import * as buildAnimationIntervalFunction from './buildAnimationIntervalFunction'
import * as executeAnimation from './executeAnimation'
import * as previousFrameHasFinished from './previousFrameHasFinished'
import * as standardAnimation from './standardAnimation'
import { ConditionFunction, Frame } from './types'

export {
	animator,
	standardAnimation,
	Frame,
	ConditionFunction,
	executeAnimation,
	animationSettings,
	buildAnimationFunction,
	buildAnimationIntervalFunction,
	previousFrameHasFinished,
}
