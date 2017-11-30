import { NullarySideEffector } from '../../utilities'

type ConditionFunction = () => boolean

interface AnimatorParams {
	animationFunction: NullarySideEffector,
	frameRate: number,
	resolveAnimation: NullarySideEffector,
	stopConditionFunction: ConditionFunction,
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
	AnimatorParams,
	BuildIntervalFunctionParams,
	ConditionFunction,
	Frame,
}
