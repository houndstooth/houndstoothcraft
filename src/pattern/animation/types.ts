import { SettingsFunctionObject } from '../../app'
import { NullarySideEffector } from '../../utilities'

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

interface ExecuteAnimationParams {
	readonly animationFunctionObjects: SettingsFunctionObject[],
	readonly layerFunctionObjects: SettingsFunctionObject[]
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
	ExecuteAnimationParams,
}
