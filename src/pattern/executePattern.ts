import { callFunctionsPerSetting, getSetting } from '../app'
import * as from from '../from'
import { state } from '../state'
import * as to from '../to'
import { executeLayer, layerSettings, thisPatternHasNotBeenCanceled } from './layer'
import { ExecuteParams } from './types'

const executePattern: (_: ExecuteParams) => Promise<void> =
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<void> => {
		const { endLayer }: layerSettings.LayerSettings = getSetting.default('layerSettings')

		callFunctionsPerSetting.default({ settingsFunctionObjects: animationFunctionObjects })

		const thisPatternRef: number = state.patternRef
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisPatternHasNotBeenCanceled.default(thisPatternRef)) {
				await executeLayer.default({ layer: to.Layer(layerValue), layerFunctionObjects, thisPatternRef })
			}
		}

		state.currentLayer = to.Layer(0)
	}

export default executePattern
