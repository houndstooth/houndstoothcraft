import { getSetting, mixDownContexts, SettingsFunctionObject } from '../app'
import * as from from '../from'
import { state } from '../state'
import * as to from '../to'
import { executeLayer, layerSettings, thisPatternHasNotBeenCanceled } from './layer'

const executePattern: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => Promise<void> =
	async ({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): Promise<void> => {
		const { startLayer, endLayer }: layerSettings.LayerSettings = getSetting.main('layerSettings')

		const thisPatternRef: number = state.patternRef
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisPatternHasNotBeenCanceled.main(thisPatternRef)) {
				await executeLayer.main({ layer: to.Layer(layerValue), startLayer, layerFunctionObjects, thisPatternRef })
			}
		}

		if (state.mixingDown) {
			mixDownContexts.main()
		}

		state.currentLayer = to.Layer(0)
	}

export { executePattern as main }
