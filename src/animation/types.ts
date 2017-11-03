import { SettingsFunctionObject } from '../execute/types'
import { NullarySideEffector } from '../utilities/types'

type ConditionFunction = () => boolean

interface AnimateParams {
	layerFunctionObjects: SettingsFunctionObject[],
	refreshCanvas: boolean
}

interface AnimatorParams {
	animationFunction: NullarySideEffector,
	frameRate: number,
	resolveAnimation: NullarySideEffector,
	stopConditionFunction: ConditionFunction,
}

interface BuildAnimationFunctionParams {
	animationFunctionObjects: SettingsFunctionObject[],
	layerFunctionObjects: SettingsFunctionObject[],
}

interface BuildIntervalFunctionParams {
	animationFunction: NullarySideEffector,
	resolveAnimation: NullarySideEffector,
	stopConditionFunction: ConditionFunction,
}

interface Frame extends Number {
	// tslint:disable-next-line:no-any
	_FrameBrand: any,
}

export {
	AnimateParams,
	AnimatorParams,
	BuildAnimationFunctionParams,
	BuildIntervalFunctionParams,
	ConditionFunction,
	Frame,
}
