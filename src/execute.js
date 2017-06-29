import clear from './render/clear'
import applicationUtilities from './utilities/applicationUtilities'
import grid from './components/grid'
import consoleWrapper from './consoleWrapper'
import { FRAME_RATE } from './defaults'
import animator from './animator'
import exportFrame from './exportFrame'

export default ({ iterating, animating, exportFrames, performanceLogging } = {}) => {
	const execute = animating ? executeAnimation : executeGrid
	execute({
		iterating,
		exportFrames,
		iterationFunctions: prepareFunctionsPerSettingsProperty({ objectWithFunctions: settings.iterations }),
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

const prepareFunctionsPerSettingsProperty = ({ objectWithFunctions, nestedPropertyPath = [], functionsArray = [] }) => {
	Object.entries(objectWithFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, nestedPropertyPath, propertyName: key })
		} else if (value) {
			prepareFunctionsPerSettingsProperty({
				objectWithFunctions: value,
				nestedPropertyPath: applicationUtilities.deeperPath({ nestedPropertyPath, propertyName: key }),
				functionsArray
			})
		}
	})
	return functionsArray
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
	const { startIteration, endIteration } = settings.initial.iteration || { startIteration: 0, endIteration: 0 }

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

	const animationFunction = () => {
		if (exportFrames && current.animation > current.lastSavedFrame) return

		if (refreshCanvas) clear()

		if (!startAnimationFrame || current.animation >= startAnimationFrame) {
			if (iterating) {
				const preIterationSettings = JSON.parse(JSON.stringify(settings.initial))
				executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
				applicationUtilities.resetObject({
					objectToReset: settings.initial,
					objectToResetTo: preIterationSettings
				})
			} else {
				gridAndMaybeLogging({ performanceLogging, iterating, animating })
			}

			if (exportFrames) {
				console.log('wtf is export frame right now', exportFrame)
				exportFrame()
			}
		}

		callFunctionsPerSettingsProperty({
			functionObjects: prepareFunctionsPerSettingsProperty({ objectWithFunctions: settings.animations })
		})
		current.animation++
	}

	const stopCondition = () => current.animation > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
