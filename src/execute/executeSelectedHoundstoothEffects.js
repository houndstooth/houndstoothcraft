import clear from '../display/clear'
import prepareFunctionsPerSetting from './prepareFunctionsPerSetting'
import codeUtilities from '../utilities/codeUtilities'
import grid from '../components/grid'
import consoleWrapper from '../utilities/consoleWrapper'
import animator from '../animation/animator'
import exportFrame from '../animation/exportFrame'
import store from '../../store'
import setupContexts from '../display/setupContexts'
import setupMixedDownCanvas from '../display/setupMixedDownCanvas'
import mixDownContexts from '../display/mixDownContexts'
import composeMainHoundstooth from './composeMainHoundstooth'

export default ({ houndstoothOverrides = {} } = {}) => {
	composeMainHoundstooth({ houndstoothEffects: store.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctions = prepareFunctionsPerSetting({
		settingsFunctions: store.mainHoundstooth.layersPattern,
	})

	setupContexts()

	if (store.exportFrames) store.mixingDown = true
	if (store.mixingDown) setupMixedDownCanvas()

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

const gridAndMaybeLogging = () => {
	const { performanceLogging, animating, currentAnimationFrame, currentLayer } = store
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
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

const callFunctionsPerSetting = ({ settingsFunctions }) => {
	settingsFunctions.forEach(settingsFunction => {
		const { settingsPath, settingName, settingFunctionItself } = settingsFunction
		let settingsWithSettingToCallFunctionOn = codeUtilities.accessChildPropertyOrCreatePath({
			objectWithProperties: store.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
		settingsWithSettingToCallFunctionOn[ settingName ] = settingFunctionItself(settingsWithSettingToCallFunctionOn[ settingName ])
	})
}

const executeGrid = ({ layerFunctions }) => {
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

	if (store.mixingDown) mixDownContexts()

	store.currentLayer = 0
}

const executeAnimation = ({ layerFunctions, animationFunctions }) => {
	const { deepClone, defaultToTrue } = codeUtilities

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = store.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	store.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = () => {
		if (store.exportFrames && store.currentAnimationFrame > store.lastSavedAnimationFrame) return

		if (store.currentAnimationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			const preLayerSettings = deepClone(store.mainHoundstooth.basePattern)
			executeGrid({ layerFunctions })
			Object.assign(store.mainHoundstooth.basePattern, preLayerSettings)

			if (store.exportFrames) exportFrame()
		}

		callFunctionsPerSetting({ settingsFunctions: animationFunctions })
		store.currentAnimationFrame++
	}

	const stopCondition = () => store.currentAnimationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
