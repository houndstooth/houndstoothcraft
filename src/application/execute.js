import clear from '../render/clear'
import applicationUtilities from '../utilities/applicationUtilities'
import grid from '../components/grid'
import consoleWrapper from './consoleWrapper'
import { FRAME_RATE, END_ITERATION } from '../defaults'
import animator from './animator'
import exportFrame from './exportFrame'

export default ({ iterating, animating, exportFrames, performanceLogging } = {}) => {
	const execute = animating ? executeAnimation : executeGrid
	const iterationFunctions = applicationUtilities.prepareFunctionsPerSettingsProperty({ objectWithFunctions: settings.iterations })
	execute({
		iterating,
		exportFrames,
		iterationFunctions,
		performanceLogging,
		animating
	})
}

const gridAndMaybeLogging = ({ performanceLogging, iterating, animating }) => {
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
	if (performanceLogging) {
		if (animating) consoleWrapper.log('current animation frame: ' + current.animation)
		if (iterating) consoleWrapper.log('current iteration frame: ' + current.iteration)
		consoleWrapper.timeEnd('grid')
	}
}

const callFunctionsPerSettingsProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let settingsObjectToCallFunctionOn = applicationUtilities.accessChildObjectOrCreatePath({
			parentObject: settings.initial,
			nestedPropertyPath
		})
		settingsObjectToCallFunctionOn[ propertyName ] = fn(settingsObjectToCallFunctionOn[ propertyName ])
	})
}

const executeIteration = ({ iterationFunctions, performanceLogging, iterating, animating }) => {
	let { startIteration, endIteration } = settings.initial.iteration || {}
	startIteration = startIteration || 0
	endIteration = endIteration || END_ITERATION

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}
		callFunctionsPerSettingsProperty({ functionObjects: iterationFunctions })
		current.iteration++
	}
	current.iteration = 0
}

const executeGrid = ({ iterating, iterationFunctions, performanceLogging, animating }) => {
	iterating ? executeIteration({
		iterationFunctions,
		performanceLogging,
		iterating,
		animating
	}) : gridAndMaybeLogging({ performanceLogging, iterating, animating })
}

const executeAnimation = ({ iterating, exportFrames, iterationFunctions, performanceLogging, animating }) => {
	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = settings.initial.animation || {}
	frameRate = frameRate || FRAME_RATE
	refreshCanvas = typeof refreshCanvas === 'undefined' ? true : refreshCanvas

	current.lastSavedFrame = startAnimationFrame

	const { deepClone, resetObject, prepareFunctionsPerSettingsProperty } = applicationUtilities

	const animationFunction = () => {
		if (exportFrames && current.animation > current.lastSavedFrame) return

		if (refreshCanvas) clear()

		if (!startAnimationFrame || current.animation >= startAnimationFrame) {
			if (iterating) {
				const preIterationSettings = deepClone(settings.initial)
				executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
				resetObject({ objectToReset: settings.initial, objectToResetTo: preIterationSettings })
			} else {
				gridAndMaybeLogging({ performanceLogging, iterating, animating })
			}

			if (exportFrames) exportFrame()
		}

		const functionObjects = prepareFunctionsPerSettingsProperty({ objectWithFunctions: settings.animations })
		callFunctionsPerSettingsProperty({ functionObjects })
		current.animation++
	}

	const stopCondition = () => current.animation > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
