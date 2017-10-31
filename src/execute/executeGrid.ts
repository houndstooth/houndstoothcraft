import { mixDownContexts } from '../canvas'
import { state } from '../state'
import { getFromBaseOrDefaultPattern, LayerSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { executeLayer } from './executeLayer'
import { SettingsFunctionObject } from './types'

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

export { executeGrid }
