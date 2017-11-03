import { state } from '../state'
import { callFunctionsPerSetting } from './callFunctionsPerSetting'
import { executeGridAndMaybeLogging } from './executeGridAndMaybeLogging'
import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, endLayer, layerFunctionObjects, startLayer }: ExecuteLayerParams): Promise<void> => {
		state.currentLayer = layer

		if (layer >= startLayer || 0) {
			await executeGridAndMaybeLogging()
		}

		if (layer < endLayer) {
			callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
		}
	}

export { executeLayer }
