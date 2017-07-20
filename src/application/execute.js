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
		animationFunctions = settingsUtilities.prepareFunctionsPerSettingsProperty({
			objectWithFunctions: currentState.settings.animations,
		})
	}
	if (iterating) {
		iterationFunctions = settingsUtilities.prepareFunctionsPerSettingsProperty({
			objectWithFunctions: currentState.settings.iterations,
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

const callFunctionsPerSettingsProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let settingsObjectToCallFunctionOn = codeUtilities.accessChildObjectOrCreatePath({
			parentObject: currentState.settings.base,
			nestedPropertyPath,
		})
		settingsObjectToCallFunctionOn[ propertyName ] = fn(settingsObjectToCallFunctionOn[ propertyName ])
	})
}

const executeIteration = ({ iterationFunctions, performanceLogging, iterating, animating }) => {
	let { startIterationFrame, endIterationFrame } = currentState.settings.base.iteration || {}
	startIterationFrame = startIterationFrame || 0

	for (let n = 0; n <= endIterationFrame; n++) {
		if (n >= startIterationFrame) {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}
		callFunctionsPerSettingsProperty({ functionObjects: iterationFunctions })
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
	const { deepClone, resetObject, defaultToTrue } = codeUtilities

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = currentState.settings.base.animation || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	currentState.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = () => {
		if (exportFrames && currentState.animationFrame > currentState.lastSavedAnimationFrame) return

		if (currentState.animationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			if (iterating) {
				const preIterationSettings = deepClone(currentState.settings.base)
				executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
				resetObject({ objectToReset: currentState.settings.base, objectToResetTo: preIterationSettings })
			}
			else {
				gridAndMaybeLogging({ performanceLogging, iterating, animating })
			}

			if (exportFrames) exportFrame()
		}

		callFunctionsPerSettingsProperty({ functionObjects: animationFunctions })
		currentState.animationFrame++
	}

	const stopCondition = () => currentState.animationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
