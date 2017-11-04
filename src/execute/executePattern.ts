import { mixDownContexts } from '../render'
import { state } from '../state'
import { getFromBaseOrDefaultPattern, LayerSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { executeLayer } from './executeLayer'
import { SettingsFunctionObject } from './types'

const executePattern: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => Promise<void> =
	async ({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): Promise<void> => {
		const { startLayer, endLayer }: LayerSettings = getFromBaseOrDefaultPattern('layerSettings')

		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			await executeLayer({ layer: to.Layer(layerValue), startLayer, endLayer, layerFunctionObjects })
		}

		if (state.mixingDown) {
			mixDownContexts()
		}

		state.currentLayer = to.Layer(0)
	}

export { executePattern }