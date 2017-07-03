import clear from '../render/clear'
import settingsUtilities from '../utilities/settingsUtilities'
import codeUtilities from '../utilities/codeUtilities'
import grid from '../components/grid'
import consoleWrapper from './consoleWrapper'
import { FRAME_RATE, END_ITERATION } from '../defaults'
import animator from './animator'
import exportFrame from './exportFrame'

export default ({ iterating, animating, exportFrames, performanceLogging } = {}) => {
	const execute = animating ? executeAnimation : executeGrid
	const iterationFunctions = settingsUtilities.prepareFunctionsPerSettingsProperty({ objectWithFunctions: settings.iterations })
	execute({
		iterating,
		exportFrames,
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
				`current animation/iteration frame: ${current.animationFrame}/${current.iterationFrame}`
			)
		}
		else if (animating) {
			consoleWrapper.log(`current animation frame: ${current.animationFrame}`)
		}
		else if (iterating) {
			consoleWrapper.log(`current iteration frame: ${current.iterationFrame}`)
		}
		consoleWrapper.timeEnd('grid')
	}
}

const callFunctionsPerSettingsProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let settingsObjectToCallFunctionOn = codeUtilities.accessChildObjectOrCreatePath({
			parentObject: settings.initial,
			nestedPropertyPath,
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
		current.iterationFrame++
	}
	current.iterationFrame = 0
}

const executeGrid = ({ performanceLogging, iterating, iterationFunctions }) => {
	if (iterating) {
		executeIteration({ performanceLogging, iterating, iterationFunctions })
	}
	else {
		gridAndMaybeLogging({ performanceLogging, iterating })
	}
}

const executeAnimation = ({ iterating, exportFrames, iterationFunctions, performanceLogging, animating }) => {
	const { deepClone, resetObject, defaultToTrue } = codeUtilities

	let { frameRate, refreshCanvas, endAnimationFrame, startAnimationFrame } = settings.initial.animation || {}
	startAnimationFrame = startAnimationFrame || 0
	frameRate = frameRate || FRAME_RATE
	refreshCanvas = defaultToTrue(refreshCanvas)

	current.lastSavedAnimationFrame = startAnimationFrame


	const animationFunction = () => {
		if (exportFrames && current.animationFrame > current.lastSavedAnimationFrame) return

		if (current.animationFrame >= startAnimationFrame) {
			if (refreshCanvas) clear()

			if (iterating) {
				const preIterationSettings = deepClone(settings.initial)
				executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
				resetObject({ objectToReset: settings.initial, objectToResetTo: preIterationSettings })
			}
			else {
				gridAndMaybeLogging({ performanceLogging, iterating, animating })
			}

			if (exportFrames) exportFrame()
		}

		callFunctionsPerSettingsProperty({
			functionObjects: settingsUtilities.prepareFunctionsPerSettingsProperty({
				objectWithFunctions: settings.animations,
			}),
		})
		current.animationFrame++
	}

	const stopCondition = () => current.animationFrame > endAnimationFrame

	animator({ animationFunction, frameRate, stopCondition })
}
