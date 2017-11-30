import { SettingsFunctionObject } from '../../app'
import { Referenced } from '../grid'

interface Layer extends Number {
	// tslint:disable-next-line:no-any
	_LayerBrand: any,
}

interface ExecuteLayerParams extends Referenced {
	readonly layer: Layer,
	readonly layerFunctionObjects: SettingsFunctionObject[],
}

export {
	Layer,
	ExecuteLayerParams,
}
