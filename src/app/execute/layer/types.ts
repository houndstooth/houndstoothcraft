import { Referenced } from '../../../pattern'
import { Layer } from '../../../types'
import { SettingFunctionObject } from '../../setting'

interface ExecuteLayerParams extends Referenced {
	layer: Layer,
	layerFunctionObjects: SettingFunctionObject[],
}

export {
	ExecuteLayerParams,
}
