import { Layer } from '../../types'
import { from, to } from '../../utilities'
import { appState } from '../appState'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import completeLayers from './layer/completeLayers'
import executeLayer from './layer/executeLayer'
import thisFrameHasNotBeenCanceled from './thisFrameHasNotBeenCanceled'
import { ExecuteParams } from './types'

const executeFrame: (_: ExecuteParams) => Promise<void> =
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<void> => {
		const endLayer: Layer = appState.controls.endLayer

		callFunctionsPerSetting({ settingFunctionObjects: animationFunctionObjects })

		const frameId: number = appState.execute.frameId
		for (let layerValue: number = 0; layerValue <= from.Layer(endLayer); layerValue++) {
			if (thisFrameHasNotBeenCanceled(frameId)) {
				await executeLayer({ layer: to.Layer(layerValue), layerFunctionObjects, frameId })
			}
		}

		completeLayers()
	}

export default executeFrame
