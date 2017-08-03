import clear from '../render/clear'
import storeUtilities from '../utilities/storeUtilities'
import codeUtilities from '../utilities/codeUtilities'
import grid from '../components/grid'
import consoleWrapper from './consoleWrapper'
import animator from './animator'
import exportFrame from './exportFrame'
import store from '../../store'

export default ({ animating, exportFrames, performanceLogging } = {}) => {
	let animationFunctions, iterationFunctions
	let execute = executeGrid
	if (animating) {
		execute = executeAnimation
		animationFunctions = storeUtilities.prepareFunctionsPerSetting({
			settingsFunctions: store.mainHoundstooth.animationsPattern,
		})
	}
	iterationFunctions = storeUtilities.prepareFunctionsPerSetting({
		settingsFunctions: store.mainHoundstooth.iterationsPattern,
	})

	execute({
		exportFrames,
		animationFunctions,
		iterationFunctions,
		performanceLogging,
		animating,
	})
}

const gridAndMaybeLogging = ({ performanceLogging, animating }) => {
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
	if (performanceLogging) {
		if (animating) {
			consoleWrapper.log(`current animation/iteration frame: ${store.animationFrame}/${store.iterationFrame}`)
		}
		else
		{
			consoleWrapper.log(`current iteration frame: ${store.iterationFrame}`)
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

const executeGrid = ({ iterationFunctions, performanceLogging, animating }) => {
	let { startIterationFrame, endIterationFrame } = store.mainHoundstooth.basePattern.iterationSettings || {}
	startIterationFrame = startIterationFrame || 0

	for (let n = 0; n <= endIterationFrame; n++) {
		if (n >= startIterationFrame) {
			gridAndMaybeLogging({ performanceLogging, animating })
		}
		if (n < endIterationFrame) {
			callFunctionsPerSetting({ settingsFunctions: iterationFunctions })
		}
		store.iterationFrame++
	}
	store.iterationFrame = 0
}

const executeAnimation = ({ exportFrames, iterationFunctions, animationFunctions, performanceLogging, animating }) => {
	const { deepClone, defaultToTrue } = codeUtilities

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = store.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	store.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = () => {
		if (exportFrames && store.animationFrame > store.lastSavedAnimationFrame) return

		if (store.animationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			const preIterationSettings = deepClone(store.mainHoundstooth.basePattern)
			executeGrid({ iterationFunctions, performanceLogging, animating })
			Object.assign(store.mainHoundstooth.basePattern, preIterationSettings)

			if (exportFrames) exportFrame()
		}

		callFunctionsPerSetting({ settingsFunctions: animationFunctions })
		store.animationFrame++
	}

	const stopCondition = () => store.animationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
