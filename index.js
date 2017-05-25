import setupCanvas from './shared/render/setupCanvas'
import clear from './shared/render/clear'
import defaultIterations from './shared/state/defaultIterations'
import iterations from './shared/state/iterations'
import overrideIterations from './shared/state/overrideIterations'
import animations from './shared/state/animations'
import defaultState from './shared/state/defaultState'
import overrideState from './shared/state/overrideState'
import state from './shared/state/state'
import standard from './standard/standard'
// import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
// import houndazzle from './houndazzle/houndazzle'

const deeperPath = ({ nestedPropertyPath, propertyName }) => {
	const deeperPath = nestedPropertyPath.slice()
	deeperPath.push(propertyName)
	return deeperPath
}

const prepareFunctionsPerStateProperty = ({ objectWithFunctions, nestedPropertyPath = [], functionsArray = [] }) => {
	Object.entries(objectWithFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, nestedPropertyPath, propertyName: key })
		} else if (value) {
			prepareFunctionsPerStateProperty({
				objectWithFunctions: value,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName: key }),
				functionsArray
			})
		}
	})
	return functionsArray
}

const accessChildObject = ({ parentObject, nestedPropertyPath }) => {
	let childObject = parentObject
	nestedPropertyPath.forEach(pathStep => {
		childObject = childObject[ pathStep ]
	})
	return childObject
}

const callFunctionsPerStateProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let stateObjectToCallFunctionOn = accessChildObject({ parentObject: state, nestedPropertyPath })
		stateObjectToCallFunctionOn[ propertyName ] = fn(stateObjectToCallFunctionOn[ propertyName ])
	})
}

// Because these objects are read-only at the top level due to being imported as modules,
// as an inconvenience we must reassign each of their immediate keys.
const resetObject = ({ objectToReset, objectToResetTo }) => {
	Object.keys(objectToResetTo).forEach(key => objectToReset[ key ] = objectToResetTo[ key ])
}

const applyOverrides = ({ objectWithPropertiesToOverride, overrides, nestedPropertyPath = [] }) => {
	Object.entries(overrides).forEach(([ propertyName, overridingProperty ]) => {
		if (typeof overridingProperty === 'object') {
			applyOverrides({
				objectWithPropertiesToOverride,
				overrides: overridingProperty,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName })
			})
		} else {
			let objectWithPropertyToOverride = accessChildObject({ parentObject: objectWithPropertiesToOverride, nestedPropertyPath })
			objectWithPropertyToOverride[ propertyName ] = overridingProperty
		}
	})
}

const setup = () => {
	setupObject({ objectToSetup: state, defaults: defaultState, overrides: overrideState })
	setupObject({ objectToSetup: iterations, defaults: defaultIterations, overrides: overrideIterations })
	setupCanvas()
}

const setupObject = ({ objectToSetup, defaults, overrides }) => {
	resetObject({ objectToReset: objectToSetup, objectToResetTo: defaults })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: overrides })
}

const executeIteration = ({ pattern, iterations }) => {
	const { startIteration, endIteration } = state.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) {
			pattern()
		}
		callFunctionsPerStateProperty({ functionObjects: iterations })
	}
}

const executePattern = ({ pattern, iterations }) => {
	if (state.iteration.iterating) {
		executeIteration({ pattern, iterations })
	} else {
		// console.time('pattern');
		pattern()
		// console.timeEnd('pattern');
	}
}

const executeAnimation = ({ pattern, iterations }) => {
	const { frameRate, refreshCanvas } = state.animation

	setInterval(() => {
		if (refreshCanvas) clear()

		if (state.iteration.iterating) {
			const preIterationState = Object.assign({}, state)
			executeIteration({ pattern, iterations })
			resetObject({ objectToReset: state, objectToResetTo: preIterationState })
		} else {
			pattern()
		}

		callFunctionsPerStateProperty({
			functionObjects: prepareFunctionsPerStateProperty({ objectWithFunctions: animations })
		})
	}, frameRate)
}

setup()

const execute = state.animation.animating ? executeAnimation : executePattern
execute({
	pattern: standard,
	iterations: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations })
})
