import clear from '../render/clear'
import stateUtilities from '../utilities/stateUtilities'
import codeUtilities from '../utilities/codeUtilities'
import grid from '../components/grid'
import consoleWrapper from './consoleWrapper'
import animator from './animator'
import exportFrame from './exportFrame'
import store from '../../store'

export default ({ iterating, animating, exportFrames, performanceLogging } = {}) => {
	let animationFunctions, iterationFunctions
	let execute = executeGrid
	if (animating) {
		execute = executeAnimation
		animationFunctions = stateUtilities.prepareFunctionsPerSetting({
			settingsFunctions: store.currentState.builtPattern.animations,
		})
	}
	if (iterating) {
		iterationFunctions = stateUtilities.prepareFunctionsPerSetting({
			settingsFunctions: store.currentState.builtPattern.iterations,
		})
	}

	execute({
		iterating,
		exportFrames,
		animationFunctions,
		iterationFunctions,
		performanceLogging,
		animating,
	})
}

const gridAndMaybeLogging = ({ performanceLogging, iterating, animating }) => {
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
	if (performanceLogging) {
		if (animating && iterating) {
			consoleWrapper.log(
				`current animation/iteration frame: ${store.currentState.animationFrame}/${store.currentState.iterationFrame}`
			)
		}
		else if (animating) {
			consoleWrapper.log(`current animation frame: ${store.currentState.animationFrame}`)
		}
		else if (iterating) {
			consoleWrapper.log(`current iteration frame: ${store.currentState.iterationFrame}`)
		}
		consoleWrapper.timeEnd('grid')
	}
}

const callFunctionsPerSetting = ({ settingsFunctions }) => {
	settingsFunctions.forEach(settingsFunction => {
		const { settingsPath, settingName, settingFunctionItself } = settingsFunction
		let settingsWithSettingToCallFunctionOn = codeUtilities.accessChildSettingOrCreatePath({
			settingsRoot: store.currentState.builtPattern.base,
			settingsPath,
		})
		settingsWithSettingToCallFunctionOn[ settingName ] = settingFunctionItself(settingsWithSettingToCallFunctionOn[ settingName ])
	})
}

const executeIteration = ({ iterationFunctions, performanceLogging, iterating, animating }) => {
	let { startIterationFrame, endIterationFrame } = store.currentState.builtPattern.base.iteration || {}
	startIterationFrame = startIterationFrame || 0

	for (let n = 0; n <= endIterationFrame; n++) {
		if (n >= startIterationFrame) {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}
		callFunctionsPerSetting({ settingsFunctions: iterationFunctions })
		store.currentState.iterationFrame++
	}
	store.currentState.iterationFrame = 0
}

const executeGrid = ({ performanceLogging, iterating, iterationFunctions }) => {
	if (iterating) {
		executeIteration({ performanceLogging, iterating, iterationFunctions })
	}
	else {
		gridAndMaybeLogging({ performanceLogging, iterating })
	}
}

const executeAnimation = ({ iterating, exportFrames, iterationFunctions, animationFunctions, performanceLogging, animating }) => {
	const { deepClone, resetSettings, defaultToTrue } = codeUtilities

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = store.currentState.builtPattern.base.animation || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	store.currentState.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = () => {
		if (exportFrames && store.currentState.animationFrame > store.currentState.lastSavedAnimationFrame) return

		if (store.currentState.animationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			if (iterating) {
				const preIterationSettings = deepClone(store.currentState.builtPattern.base)
				executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
				resetSettings({ settingsToReset: store.currentState.builtPattern.base, settingsToResetTo: preIterationSettings })
			}
			else {
				gridAndMaybeLogging({ performanceLogging, iterating, animating })
			}

			if (exportFrames) exportFrame()
		}

		callFunctionsPerSetting({ settingsFunctions: animationFunctions })
		store.currentState.animationFrame++
	}

	const stopCondition = () => store.currentState.animationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
