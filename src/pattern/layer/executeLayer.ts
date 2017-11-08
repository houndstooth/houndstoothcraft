import { callFunctionsPerSetting } from '../../app'
import * as from from '../../from'
import { state } from '../../state'
import { executeGridAndMaybeLogging } from '../grid'
import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, layerFunctionObjects, startLayer, thisPatternRef }: ExecuteLayerParams): Promise<void> => {
		state.currentLayer = layer

		if (from.Layer(layer) > 0) {
			callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
		}

		if (from.Layer(layer) >= from.Layer(startLayer) || 0) {
			await executeGridAndMaybeLogging({ thisPatternRef })
		}
	}

export { executeLayer }
