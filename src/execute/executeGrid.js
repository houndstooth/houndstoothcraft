import store from '../../store'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import components from '../components'
import display from '../display'
import consoleWrapper from '../utilities/consoleWrapper'

export default ({ layerFunctions }) => {
	let { startLayer, endLayer } = store.mainHoundstooth.basePattern.layerSettings || {}
	startLayer = startLayer || 0

	for (let n = 0; n <= endLayer; n++) {
		if (n >= startLayer) {
			gridAndMaybeLogging()
		}
		if (n < endLayer) {
			callFunctionsPerSetting({ settingsFunctions: layerFunctions })
		}
		store.currentLayer++
	}

	if (store.mixingDown) display.mixDownContexts()

	store.currentLayer = 0
}

const gridAndMaybeLogging = () => {
	const { performanceLogging, animating, currentAnimationFrame, currentLayer } = store
	if (performanceLogging) consoleWrapper.time('grid')
	components.grid()
	if (performanceLogging) {
		if (animating) {
			consoleWrapper.log(`current animation frame / layer: ${currentAnimationFrame}/${currentLayer}`)
		}
		else {
			consoleWrapper.log(`current layer: ${currentLayer}`)
		}
		consoleWrapper.timeEnd('grid')
	}
}
