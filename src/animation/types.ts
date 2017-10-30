import { SettingsFunctionObject } from '../execute/types'
import { NullarySideEffector } from '../utilities/types'

type ConditionFunction = () => boolean

interface AnimateParams {
	layerFunctionObjects: SettingsFunctionObject[],
	refreshCanvas: boolean
}

interface AnimatorParams extends BuildIntervalFunctionParams {
	frameRate: number,
}

interface BuildAnimationFunctionParams {
	animationFunctionObjects: SettingsFunctionObject[],
	layerFunctionObjects: SettingsFunctionObject[],
	refreshCanvas: boolean,
	startFrame: Frame,
}

interface BuildIntervalFunctionParams {
	animationFunction: NullarySideEffector,
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
