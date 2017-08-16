import clear from '../render/clear'
import storeUtilities from '../utilities/storeUtilities'
import codeUtilities from '../utilities/codeUtilities'
import grid from '../components/grid'
import consoleWrapper from '../utilities/consoleWrapper'
import animator from '../animation/animator'
import exportFrame from '../animation/exportFrame'
import store from '../../store'
import setupCanvases from './setupCanvases'
import setupContexts from './setupContexts'
import setupMixedDownCanvas from '../render/setupMixedDownCanvas'
import mixDownCanvases from '../render/mixDownCanvases'

export default () => {
	const iterationFunctions = storeUtilities.prepareFunctionsPerSetting({
		settingsFunctions: store.mainHoundstooth.iterationsPattern,
	})

	setupCanvases()
	setupMixedDownCanvas()
	setupContexts()

	if (store.animating) {
		const animationFunctions = storeUtilities.prepareFunctionsPerSetting({
			settingsFunctions: store.mainHoundstooth.animationsPattern,
		})
		executeAnimation({ animationFunctions, iterationFunctions })
	}
	else {
		executeGrid({ iterationFunctions })
	}
}

const gridAndMaybeLogging = () => {
	const { performanceLogging, animating, animationFrame, iterationFrame } = store
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
	if (performanceLogging) {
		if (animating) {
			consoleWrapper.log(`current animation/iteration frame: ${animationFrame}/${iterationFrame}`)
		}
		else {
			consoleWrapper.log(`current iteration frame: ${iterationFrame}`)
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

const executeGrid = ({ iterationFunctions }) => {
	let { startIterationFrame, endIterationFrame } = store.mainHoundstooth.basePattern.iterationSettings || {}
	startIterationFrame = startIterationFrame || 0

	for (let n = 0; n <= endIterationFrame; n++) {
		if (n >= startIterationFrame) {
			gridAndMaybeLogging()
		}
		if (n < endIterationFrame) {
			callFunctionsPerSetting({ settingsFunctions: iterationFunctions })
		}
		store.iterationFrame++
	}

	mixDownCanvases()

	store.iterationFrame = 0
}

const executeAnimation = ({ iterationFunctions, animationFunctions }) => {
	const { deepClone, defaultToTrue } = codeUtilities

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = store.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	store.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = () => {
		if (store.exportFrames && store.animationFrame > store.lastSavedAnimationFrame) return

		if (store.animationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			const preIterationSettings = deepClone(store.mainHoundstooth.basePattern)
			executeGrid({ iterationFunctions })
			Object.assign(store.mainHoundstooth.basePattern, preIterationSettings)

			if (store.exportFrames) exportFrame()
		}

		callFunctionsPerSetting({ settingsFunctions: animationFunctions })
		store.animationFrame++
	}

	const stopCondition = () => store.animationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
