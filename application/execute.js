import state from '../state/state'
import iterations from '../state/iterations'
import animations from '../state/animations'
import currentIteration from '../state/currentIteration'
import currentAnimation from '../state/currentAnimation'
import applicationUtilities from '../utilities/applicationUtilities'
import grid from '../components/grid'
import shapesForElm from '../render/shapesForElm'

export default ({ iterating, animating, performanceLogging }) => {
	const execute = animating ? executeAnimation : executeGrid
	execute({
		iterating,
		iterationFunctions: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations }),
		performanceLogging,
		animating
	})
}

const gridAndMaybeLogging = ({ performanceLogging, iterating, animating }) => {
	if (performanceLogging) console.time('grid');
	grid()
	if (performanceLogging) {
		if (animating) console.log('current animation frame: ', currentAnimation.i)
		if (iterating) console.log('current iteration frame: ', currentIteration.i)
		console.timeEnd('grid');
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
	iterating ? executeIteration({ iterationFunctions, performanceLogging, iterating, animating }) : gridAndMaybeLogging({ performanceLogging, iterating, animating })
}

const executeAnimation = ({ iterating, iterationFunctions, performanceLogging, animating }) => {
	const { frameRate } = state.animation

	setInterval(() => {
		currentAnimation.i++

		if (iterating) {
			const preIterationState = JSON.parse(JSON.stringify(state))
			executeIteration({ iterationFunctions, performanceLogging, iterating, animating })
			applicationUtilities.resetObject({ objectToReset: state, objectToResetTo: preIterationState })
		} else {
			gridAndMaybeLogging({ performanceLogging, iterating, animating })
		}

		shapesForElm.shapes = []

		callFunctionsPerStateProperty({
			functionObjects: prepareFunctionsPerStateProperty({ objectWithFunctions: animations })
		})
	}, frameRate)
}
