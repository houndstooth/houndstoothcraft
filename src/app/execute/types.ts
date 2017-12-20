import { Layer } from '../../types'
import { SettingFunctionObject } from '../setting'

interface ExecuteParams {
	animationFunctionObjects: SettingFunctionObject[],
	layerFunctionObjects: SettingFunctionObject[]
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
	ExecuteParams,
	ExecuteState,
}
