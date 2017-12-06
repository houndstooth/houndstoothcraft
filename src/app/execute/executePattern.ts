import * as from from '../../from'
import { layerSettings } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { getSetting } from '../settings'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import completeLayers from './completeLayers'
import executeLayer from './executeLayer'
import thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'
import { ExecuteParams } from './types'

const executePattern: (_: ExecuteParams) => Promise<void> =
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<void> => {
		const { endLayer }: layerSettings.LayerSettings = getSetting.default('layerSettings')

		callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })

		const thisPatternRef: number = state.execute.patternRef
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisPatternHasNotBeenCanceled(thisPatternRef)) {
				await executeLayer({ layer: to.Layer(layerValue), layerFunctionObjects, thisPatternRef })
			}
		}

		completeLayers()
	}

export default executePattern
