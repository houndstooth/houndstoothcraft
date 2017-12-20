import { Referenced } from '../../pattern'
import { Layer } from '../../types'
import { SettingFunctionObject } from '../settings'

interface AnimationParams {
	animationFunction: () => void,
	resolveAnimation: () => void,
}

interface ExecuteParams {
	animationFunctionObjects: SettingFunctionObject[],
	layerFunctionObjects: SettingFunctionObject[]
}

interface ExecuteLayerParams extends Referenced {
	layer: Layer,
	layerFunctionObjects: SettingFunctionObject[],
}

interface ExecuteState {
	animationInterval?: number,
	currentLayer: Layer,
	frameId: number,
	gridProgressInterval?: number,
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
