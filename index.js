import setupCanvas from './shared/render/setupCanvas'
import clear from './shared/render/clear'
import iterations from './shared/state/iterations'
import animations from './shared/state/animations'
import defaultState from './shared/state/defaultState'
import overrideState from './shared/state/overrideState'
import state from './shared/state/state'
import standard from './standard/standard'
// import cmyktooth from './cmyktooth/cmyktooth'
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

const accessStateObjectWithProperty = ({ nestedPropertyPath }) => {
	let stateObjectWithProperty = state
	nestedPropertyPath.forEach(pathStep => {
		stateObjectWithProperty = stateObjectWithProperty[ pathStep ]
	})
	return stateObjectWithProperty
}

const callFunctionsPerStateProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let stateObjectToCallFunctionOn = accessStateObjectWithProperty({ nestedPropertyPath, propertyName })
		stateObjectToCallFunctionOn[ propertyName ] = fn(stateObjectToCallFunctionOn[ propertyName ])
	})
}

const resetState = ({ objectToResetStateTo }) => {
	Object.keys(objectToResetStateTo).forEach(key => {
		state[ key ] = Object.assign({}, objectToResetStateTo[ key ])
	})
}

const prepareState = ({ stateOverridesObject, nestedPropertyPath }) => {
	Object.entries(stateOverridesObject).forEach(([ propertyName, stateOverrideProperty ]) => {
		if (typeof stateOverrideProperty === 'object') {
			prepareState({
				stateOverridesObject: stateOverrideProperty,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName })
			})
		} else {
			let stateObjectWithProperty = accessStateObjectWithProperty({ nestedPropertyPath })
			stateObjectWithProperty[ propertyName ] = stateOverrideProperty
		}
	})
}

const setupState = () => {
	resetState({ objectToResetStateTo: defaultState })
	prepareState({ stateOverridesObject: overrideState, nestedPropertyPath: [] })
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
			resetState({ objectToResetStateTo: preIterationState })
		} else {
			pattern()
		}

		callFunctionsPerStateProperty({
			functionObjects: prepareFunctionsPerStateProperty({ objectWithFunctions: animations })
		})
	}, frameRate)
}

setupState()
setupCanvas()

const execute = state.animation.animating ? executeAnimation : executePattern
execute({
	pattern: standard,
	iterations: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations })
})
