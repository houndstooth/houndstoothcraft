import clear from './render/clear'
import canvas from './render/canvas'
import applicationUtilities from './utilities/applicationUtilities'
import fileSaver from 'file-saver'
import grid from './components/grid'
import consoleWrapper from './consoleWrapper'
import { FRAME_RATE } from './defaults'

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
	current.iteration = 0
	const { startIteration, endIteration } = settings.initial.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}
		callFunctionsPerSettingsProperty({ functionObjects: iterationFunctions })
		current.iteration++
	}
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
	let { frameRate, refreshCanvas } = settings.initial && settings.initial.animation || { frameRate: FRAME_RATE }
	refreshCanvas = typeof refreshCanvas === 'undefined' ? true : refreshCanvas

	let lastSavedFrame = 0
	setInterval(() => {
		if (exportFrames) {
			if (current.animation > lastSavedFrame) return
		}
		current.animation++

		if (refreshCanvas) clear()

		if (iterating) {
			const preIterationSettings = JSON.parse(JSON.stringify(settings))
			executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
			applicationUtilities.resetObject({ objectToReset: settings, objectToResetTo: preIterationSettings })
		} else {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}

		if (exportFrames) {
			canvas.toBlob(blob => {
				lastSavedFrame++
				fileSaver.saveAs(blob, lastSavedFrame + ".png")
			})
		}

		callFunctionsPerSettingsProperty({
			functionObjects: prepareFunctionsPerSettingsProperty({ objectWithFunctions: settings.animations })
		})
	}, frameRate)
}