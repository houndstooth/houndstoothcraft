import { Referenced } from '../../pattern'
import { Layer } from '../../types'
import { SettingsFunctionObject } from '../settings'

interface AnimationParams {
	animationFunction: () => void,
	resolveAnimation: () => void,
}

interface ExecuteParams {
	animationFunctionObjects: SettingsFunctionObject[],
	layerFunctionObjects: SettingsFunctionObject[]
}

interface ExecuteLayerParams extends Referenced {
	layer: Layer,
	layerFunctionObjects: SettingsFunctionObject[],
}

interface ExecuteState {
	animationInterval?: number,
	currentLayer: Layer,
	gridProgressInterval?: number,
	patternRef: number,
	performanceLogging: boolean,
	resolveGrid: () => void,
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
