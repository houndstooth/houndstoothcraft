import iterations from './state/iterations'
import animations from './state/animations'
import currentIteration from './state/currentIteration'
import currentAnimation from './state/currentAnimation'
import clear from './render/clear'
import canvas from './render/canvas'
import applicationUtilities from './utilities/applicationUtilities'
import fileSaver from 'file-saver'
import grid from './components/grid'
import consoleWrapper from './consoleWrapper'

export default ({ iterating, animating, exportFrames, performanceLogging } = {}) => {
	const execute = animating ? executeAnimation : executeGrid
	execute({
		iterating,
		exportFrames,
		iterationFunctions: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations }),
		performanceLogging,
		animating
	})
}

const gridAndMaybeLogging = ({ performanceLogging, iterating, animating }) => {
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
	if (performanceLogging) {
		if (animating) consoleWrapper.log('current animation frame: ', currentAnimation.i)
		if (iterating) consoleWrapper.log('current iteration frame: ', currentIteration.i)
		consoleWrapper.timeEnd('grid')
	}
}

const prepareFunctionsPerStateProperty = ({ objectWithFunctions, nestedPropertyPath = [], functionsArray = [] }) => {
	Object.entries(objectWithFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, nestedPropertyPath, propertyName: key })
		} else if (value) {
			prepareFunctionsPerStateProperty({
				objectWithFunctions: value,
				nestedPropertyPath: applicationUtilities.deeperPath({ nestedPropertyPath, propertyName: key }),
				functionsArray
			})
		}
	})
	return functionsArray
}

const callFunctionsPerStateProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let stateObjectToCallFunctionOn = applicationUtilities.accessChildObjectOrCreatePath({
			parentObject: state,
			nestedPropertyPath
		})
		stateObjectToCallFunctionOn[ propertyName ] = fn(stateObjectToCallFunctionOn[ propertyName ])
	})
}

const executeIteration = ({ iterationFunctions, performanceLogging, iterating, animating }) => {
	currentIteration.i = 0
	const { startIteration, endIteration } = state.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}
		callFunctionsPerStateProperty({ functionObjects: iterationFunctions })
		currentIteration.i++
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
	const { frameRate, refreshCanvas } = state.animation

	let lastSavedFrame = 0
	setInterval(() => {
		if (exportFrames) {
			if (currentAnimation.i > lastSavedFrame) return
		}
		currentAnimation.i++

		if (refreshCanvas) clear()

		if (iterating) {
			const preIterationState = JSON.parse(JSON.stringify(state))
			executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
			applicationUtilities.resetObject({ objectToReset: state, objectToResetTo: preIterationState })
		} else {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}

		if (exportFrames) {
			canvas.toBlob(blob => {
				lastSavedFrame++
				fileSaver.saveAs(blob, lastSavedFrame + ".png")
			})
		}

		callFunctionsPerStateProperty({
			functionObjects: prepareFunctionsPerStateProperty({ objectWithFunctions: animations })
		})
	}, frameRate)
}
