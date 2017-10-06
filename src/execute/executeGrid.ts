import state from '../state'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import { mixDownContexts } from '../canvas'
import gridAndMaybeLogging from './gridAndMaybeLogging'

const executeGrid = ({ layerFunctions }) => {
	let { startLayer, endLayer } : { startLayer?, endLayer } = state.mainHoundstooth.basePattern.layerSettings || {}
	startLayer = startLayer || 0

	for (let n = 0; n <= endLayer; n++) {
		if (n >= startLayer) {
			gridAndMaybeLogging()
		}
		if (n < endLayer) {
			callFunctionsPerSetting({ settingsFunctions: layerFunctions })
		}
		state.currentLayer++
	}

	if (state.mixingDown) mixDownContexts()

	state.currentLayer = 0
}

export default executeGrid
