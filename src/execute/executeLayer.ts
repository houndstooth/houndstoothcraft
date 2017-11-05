import { state } from '../state'
import * as from from '../utilities/from'
import { callFunctionsPerSetting } from './callFunctionsPerSetting'
import { executeGridAndMaybeLogging } from './executeGridAndMaybeLogging'
import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, layerFunctionObjects, startLayer }: ExecuteLayerParams): Promise<void> => {
		state.currentLayer = layer

		if (from.Layer(layer) > 0) {
			callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
		}

		if (from.Layer(layer) >= from.Layer(startLayer) || 0) {
			await executeGridAndMaybeLogging()
		}
	}

export { executeLayer }
