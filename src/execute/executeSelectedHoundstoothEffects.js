import display from '../display'
import prepareFunctionsPerSetting from './prepareFunctionsPerSetting'
import codeUtilities from '../utilities/codeUtilities'
import animation from '../animation'
import store from '../../store'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeGrid from './executeGrid'

export default ({ houndstoothOverrides = {} } = {}) => {
	composeMainHoundstooth({ houndstoothEffects: store.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctions = prepareFunctionsPerSetting({
		settingsFunctions: store.mainHoundstooth.layersPattern,
	})

	display.setupContexts()

	if (store.exportFrames) store.mixingDown = true
	if (store.mixingDown) display.setupMixedDownCanvas()

	if (store.animating) {
		const animationFunctions = prepareFunctionsPerSetting({
			settingsFunctions: store.mainHoundstooth.animationsPattern,
		})
		executeAnimation({ animationFunctions, layerFunctions })
	}
	else {
		executeGrid({ layerFunctions })
	}
}

const executeAnimation = ({ layerFunctions, animationFunctions }) => {
	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = store.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = codeUtilities.defaultToTrue(refreshCanvas)

	store.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = animation.buildAnimationFunction({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas })

	const stopCondition = () => store.currentAnimationFrame > endAnimationFrame

	animation.animator({ animationFunction, frameRate, stopCondition })
}
