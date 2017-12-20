import { Referenced } from '../../../pattern'
import { Layer } from '../../../types'
import { SettingFunctionObject } from '../../settings'

interface ExecuteLayerParams extends Referenced {
	layer: Layer,
	layerFunctionObjects: SettingFunctionObject[],
}

export {
	ExecuteLayerParams,
}
