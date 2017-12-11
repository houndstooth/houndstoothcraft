import { Layer, Referenced } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { SettingsFunctionObject } from '../settings'

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

interface ExecuteState {
	animationInterval?: number,
	currentLayer: Layer,
	gridProgressInterval?: number,
	patternRef: number,
	performanceLogging: boolean,
	resolveGrid: NullarySideEffector,
	tileCount: number,
	tilesCompleted: number,

	// tslint:disable-next-line:no-any
	[ _: string ]: any,
}

export {
	AnimationParams,
	ExecuteParams,
	ExecuteLayerParams,
	ExecuteState,
}
