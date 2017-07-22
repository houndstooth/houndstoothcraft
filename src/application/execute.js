import clear from '../render/clear'
import settingsUtilities from '../utilities/settingsUtilities'
import codeUtilities from '../utilities/codeUtilities'
import grid from '../components/grid'
import consoleWrapper from './consoleWrapper'
import animator from './animator'
import exportFrame from './exportFrame'

export default ({ iterating, animating, exportFrames, performanceLogging } = {}) => {
	let animationFunctions, iterationFunctions
	let execute = executeGrid
	if (animating) {
		execute = executeAnimation
		animationFunctions = settingsUtilities.prepareFunctionsPerSetting({
			settingsFunctions: currentState.builtPattern.animations,
		})
	}
	if (iterating) {
		iterationFunctions = settingsUtilities.prepareFunctionsPerSetting({
			settingsFunctions: currentState.builtPattern.iterations,
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
				`current animation/iteration frame: ${currentState.animationFrame}/${currentState.iterationFrame}`
			)
		}
		else if (animating) {
			consoleWrapper.log(`current animation frame: ${currentState.animationFrame}`)
		}
		else if (iterating) {
			consoleWrapper.log(`current iteration frame: ${currentState.iterationFrame}`)
		}
		consoleWrapper.timeEnd('grid')
	}
}

const callFunctionsPerSetting = ({ settingsFunctions }) => {
	settingsFunctions.forEach(settingsFunction => {
		const { settingsPath, settingName, settingFunctionItself } = settingsFunction
		let settingsWithSettingToCallFunctionOn = codeUtilities.accessChildSettingOrCreatePath({
			settingsRoot: currentState.builtPattern.base,
			settingsPath,
		})
		settingsWithSettingToCallFunctionOn[ settingName ] = settingFunctionItself(settingsWithSettingToCallFunctionOn[ settingName ])
	})
}

const executeIteration = ({ iterationFunctions, performanceLogging, iterating, animating }) => {
	let { startIterationFrame, endIterationFrame } = currentState.builtPattern.base.iteration || {}
	startIterationFrame = startIterationFrame || 0

	for (let n = 0; n <= endIterationFrame; n++) {
		if (n >= startIterationFrame) {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}
		callFunctionsPerSetting({ settingsFunctions: iterationFunctions })
		currentState.iterationFrame++
	}
	currentState.iterationFrame = 0
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

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = currentState.builtPattern.base.animation || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	currentState.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = () => {
		if (exportFrames && currentState.animationFrame > currentState.lastSavedAnimationFrame) return

		if (currentState.animationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			if (iterating) {
				const preIterationSettings = deepClone(currentState.builtPattern.base)
				executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
				resetSettings({ settingsToReset: currentState.builtPattern.base, settingsToResetTo: preIterationSettings })
			}
			else {
				gridAndMaybeLogging({ performanceLogging, iterating, animating })
			}

			if (exportFrames) exportFrame()
		}

		callFunctionsPerSetting({ settingsFunctions: animationFunctions })
		currentState.animationFrame++
	}

	const stopCondition = () => currentState.animationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
