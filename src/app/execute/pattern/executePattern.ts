import { Layer } from '../../../types'
import { from, to } from '../../../utilities'
import { appState } from '../../appState'
import callFunctionsPerSetting from '../callFunctionsPerSetting'
import { completeLayers, executeLayer } from '../layer'
import thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'
import { ExecuteParams } from '../types'

const executePattern: (_: ExecuteParams) => Promise<void> =
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<void> => {
		const endLayer: Layer = appState.controls.endLayer

		callFunctionsPerSetting({ settingFunctionObjects: animationFunctionObjects })

		const patternId: number = appState.execute.patternId
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisPatternHasNotBeenCanceled(patternId)) {
				await executeLayer.default({ layer: to.Layer(layerValue), layerFunctionObjects, patternId })
			}
		}

		completeLayers.default()
	}

export default executePattern
