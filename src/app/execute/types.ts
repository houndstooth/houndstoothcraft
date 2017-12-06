import { Layer, Referenced } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { SettingsFunctionObject } from '../settings'

type ConditionFunction = () => boolean

interface AnimationParams {
	animationFunction: NullarySideEffector,
	resolveAnimation: NullarySideEffector,
}

interface ExecuteParams {
	readonly animationFunctionObjects: SettingsFunctionObject[],
	readonly layerFunctionObjects: SettingsFunctionObject[]
}

interface ExecuteLayerParams extends Referenced {
	readonly layer: Layer,
	readonly layerFunctionObjects: SettingsFunctionObject[],
}

export {
	ConditionFunction,
	AnimationParams,
	ExecuteParams,
	ExecuteLayerParams,
}
