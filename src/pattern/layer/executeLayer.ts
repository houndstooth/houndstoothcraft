import { callFunctionsPerSetting } from '../../app'
import { state } from '../../state'
import { executeGridAndMaybeLogging } from '../grid'
import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, layerFunctionObjects, thisPatternRef }: ExecuteLayerParams): Promise<void> => {
		state.currentLayer = layer

		callFunctionsPerSetting.default({ settingsFunctionObjects: layerFunctionObjects })

		await executeGridAndMaybeLogging.default({ thisPatternRef })
	}

export default executeLayer
