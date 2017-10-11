import state from '../state'
import { mixDownContexts } from '../canvas'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import gridAndMaybeLogging from './gridAndMaybeLogging'
import SettingsFunctionObject from './SettingsFunctionObject'

type ExecuteGrid = { ({}: { layerFunctionObjects: SettingsFunctionObject[] }): void }
const executeGrid: ExecuteGrid = ({ layerFunctionObjects }) => {
	const layerSettings = state.mainHoundstooth.basePattern.layerSettings || {}
	const { startLayer, endLayer } = layerSettings

	for (let n = 0; n <= endLayer; n++) {
		executeLayer({ n, startLayer, endLayer, layerFunctionObjects })
	}

	if (state.mixingDown) {
		mixDownContexts()
	}

	state.currentLayer = 0
}

type ExecuteLayer = {
	({}: { n: number, startLayer: number, endLayer: number, layerFunctionObjects: SettingsFunctionObject[] }): void,
}
const executeLayer: ExecuteLayer = ({ n, startLayer, endLayer, layerFunctionObjects }) => {
	if (n >= startLayer || 0) {
		gridAndMaybeLogging()
	}
	if (n < endLayer) {
		callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
	}
	state.currentLayer++
}

export default executeGrid
