import { mixDownContexts, SettingsFunctionObject } from '../app'
// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../app/store/getFromBaseOrDefaultPattern'
import * as from from '../from'
import { state } from '../state'
import * as to from '../to'
import { executeLayer, layerSettings, thisPatternHasNotBeenCanceled } from './layer'

const executePattern: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => Promise<void> =
	async ({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): Promise<void> => {
		const { startLayer, endLayer }: layerSettings.LayerSettings = getFromBaseOrDefaultPattern('layerSettings')

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
