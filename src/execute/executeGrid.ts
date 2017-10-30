import { mixDownContexts } from '../canvas'
import { state } from '../state'
import { getFromBaseOrDefaultPattern, LayerSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { callFunctionsPerSetting } from './callFunctionsPerSetting'
import { gridAndMaybeLogging } from './gridAndMaybeLogging'
import { ExecuteLayerParams, SettingsFunctionObject } from './types'

const executeGrid: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void =
	({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): void => {
		const { startLayer, endLayer }: LayerSettings = getFromBaseOrDefaultPattern('layerSettings')

		for (let currentLayerValue: number = 0; currentLayerValue <= from.Layer(endLayer); currentLayerValue++) {
			executeLayer({ currentLayer: to.Layer(currentLayerValue), startLayer, endLayer, layerFunctionObjects })
		}

		if (state.mixingDown) {
			mixDownContexts()
		}

		state.currentLayer = to.Layer(0)
	}

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

export { executeGrid }
