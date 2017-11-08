import { mixDownContexts, SettingsFunctionObject, thisPatternHasNotBeenCanceled } from '../app'
import { getFromBaseOrDefaultPattern } from '../app/store/getFromBaseOrDefaultPattern'
import * as from from '../from'
import { state } from '../state'
import * as to from '../to'
import { executeLayer , layerSettings } from './layer'

const executePattern: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => Promise<void> =
	async ({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): Promise<void> => {
		const { startLayer, endLayer }: layerSettings.LayerSettings = getFromBaseOrDefaultPattern('layerSettings')

		const thisPatternRef: number = state.patternRef
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisPatternHasNotBeenCanceled(thisPatternRef)) {
				await executeLayer({ layer: to.Layer(layerValue), startLayer, layerFunctionObjects, thisPatternRef })
			}
		}

		if (state.mixingDown) {
			mixDownContexts()
		}

		state.currentLayer = to.Layer(0)
	}

export { executePattern }
