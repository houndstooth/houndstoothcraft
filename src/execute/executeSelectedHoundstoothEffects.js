import canvas from '../canvas'
import prepareFunctionsPerSetting from './prepareFunctionsPerSetting'
import codeUtilities from '../utilities/codeUtilities'
import animation from '../animation'
import state from '../../state'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeGrid from './executeGrid'

export default ({ houndstoothOverrides = {} } = {}) => {
	composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctions = prepareFunctionsPerSetting({
		settingsFunctions: state.mainHoundstooth.layersPattern,
	})

	canvas.setupContexts()

	if (state.exportFrames) state.mixingDown = true
	if (state.mixingDown) canvas.setupMixedDownCanvas()

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

const executeAnimation = ({ layerFunctions, animationFunctions }) => {
	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = state.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = codeUtilities.defaultToTrue(refreshCanvas)

	state.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = animation.buildAnimationFunction({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas })

	const stopCondition = () => state.currentAnimationFrame > endAnimationFrame

	animation.animator({ animationFunction, frameRate, stopCondition })
}
