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

		const thisPatternRef: number = state.patternRef
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisPatternHasNotBeenCancelled(thisPatternRef)) {
				await executeLayer({ layer: to.Layer(layerValue), startLayer, layerFunctionObjects })
			}
		}

		if (state.mixingDown) {
			mixDownContexts()
		}

		state.currentLayer = to.Layer(0)
	}

const thisPatternHasNotBeenCancelled: (patternRef: number) => boolean =
	(patternRef: number): boolean =>
		patternRef === state.patternRef

export { executePattern }
