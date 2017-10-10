import state from '../state'
import { mixDownContexts } from '../canvas'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import gridAndMaybeLogging from './gridAndMaybeLogging'

const executeGrid = ({ layerFunctions }) => {
	const { startLayer, endLayer }: { startLayer?, endLayer } = state.mainHoundstooth.basePattern.layerSettings || {}

	for (let n = 0; n <= endLayer; n++) {
		if (n >= startLayer || 0) {
			gridAndMaybeLogging()
		}
		if (n < endLayer) {
			callFunctionsPerSetting({ settingsFunctions: layerFunctions })
		}
		state.currentLayer++
	}

	if (state.mixingDown) {
		mixDownContexts()
	}

	state.currentLayer = 0
}

export default executeGrid
