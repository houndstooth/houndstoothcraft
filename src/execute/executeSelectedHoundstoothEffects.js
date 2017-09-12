import page from '../page'
import prepareFunctionsPerSetting from './prepareFunctionsPerSetting'
import state from '../../state'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeGrid from './executeGrid'
import executeAnimation from './executeAnimation'

export default ({ houndstoothOverrides = {} } = {}) => {
	composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctions = prepareFunctionsPerSetting({
		settingsFunctions: state.mainHoundstooth.layersPattern,
	})

	page.setupContexts()
	if (state.exportFrames) state.mixingDown = true
	if (state.mixingDown) page.setupMixedDownCanvas()

	if (state.animating) {
		const animationFunctions = prepareFunctionsPerSetting({
			settingsFunctions: state.mainHoundstooth.animationsPattern,
		})
		executeAnimation({ animationFunctions, layerFunctions })
	}
	else {
		executeGrid({ layerFunctions })
	}
}
