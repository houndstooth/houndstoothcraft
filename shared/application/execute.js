import state from '../state/state'
import iterations from '../state/iterations'
import animations from '../state/animations'
import currentIteration from '../state/currentIteration'
import clear from '../render/clear'
import canvas from '../render/canvas'
import applicationUtilities from '../utilities/applicationUtilities'
import fileSaver from 'file-saver'

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
		let stateObjectToCallFunctionOn = applicationUtilities.accessChildObjectOrCreatePath({ parentObject: state, nestedPropertyPath })
		stateObjectToCallFunctionOn[ propertyName ] = fn(stateObjectToCallFunctionOn[ propertyName ])
	})
}

const executeIteration = ({ pattern, iterationFunctions }) => {
	currentIteration.i = 0
	const { startIteration, endIteration } = state.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) pattern()
		callFunctionsPerStateProperty({ functionObjects: iterationFunctions })
		currentIteration.i++
	}
}

const executePattern = ({ pattern, iterating, iterationFunctions }) => {
	if (iterating) {
		executeIteration({ pattern, iterationFunctions })
	} else {
		// console.time('pattern');
		pattern()
		// console.timeEnd('pattern');
	}
}

const executeAnimation = ({ pattern, iterating, exportFrames, iterationFunctions }) => {
	const { frameRate, refreshCanvas } = state.animation

	let lastSavedFrame = 0
	let currentFrame = 0
	setInterval(() => {
		if (exportFrames) {
			if (currentFrame > lastSavedFrame) return
			currentFrame++
		}

		if (refreshCanvas) clear()

		if (iterating) {
			const preIterationState = JSON.parse(JSON.stringify(state))
			executeIteration({ pattern, iterationFunctions })
			applicationUtilities.resetObject({ objectToReset: state, objectToResetTo: preIterationState })
		} else {
			pattern()
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

export default ({ pattern, iterating, animating, exportFrames }) => {
	const executionFunction = animating ? executeAnimation : executePattern
	executionFunction({
		pattern,
		iterating,
		exportFrames,
		iterationFunctions: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations })
	})
}