import { ExecuteLayerParams } from './types'
import { gridAndMaybeLogging } from './gridAndMaybeLogging'
import { callFunctionsPerSetting } from './callFunctionsPerSetting'
import { state } from '../state'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const executeLayer: (_: ExecuteLayerParams) => void =
	({ currentLayer, endLayer, layerFunctionObjects, startLayer }: ExecuteLayerParams): void => {
		if (currentLayer >= startLayer || 0) {
			gridAndMaybeLogging()
		}
		if (currentLayer < endLayer) {
			callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
		}
		state.currentLayer = to.Layer(from.Layer(state.currentLayer) + 1)
	}

export { executeLayer }
