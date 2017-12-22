import { Layer } from '../../../types'
import { SettingFunctionObject } from '../../setting'
import { PatternIdAsParam } from '../pattern'

interface ExecuteLayerParams extends PatternIdAsParam {
	layer: Layer,
	layerFunctionObjects: SettingFunctionObject[],
}

export {
	ExecuteLayerParams,
}
