import setupCanvas from './shared/render/setupCanvas'
import clear from './shared/render/clear'
import defaultIterations from './shared/state/defaultIterations'
import iterations from './shared/state/iterations'
import overrideIterations from './shared/state/overrideIterations'
import overrideAnimations from './shared/state/overrideAnimations'
import defaultAnimations from './shared/state/defaultAnimations'
import animations from './shared/state/animations'
import defaultState from './shared/state/defaultState'
import overrideState from './shared/state/overrideState'
import currentIteration from './shared/state/currentIteration'
import state from './shared/state/state'
import standard from './standard/standard'
import canvas from './shared/render/canvas'
import fileSaver from 'file-saver'
// import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
// import houndazzle from './houndazzle/houndazzle'
// import cmyktoothPreset from './cmyktooth/cmyktoothPreset'
import ginghamChevronContinuumAnimatedPreset from './gingham-chevron-continuum-animated/ginghamChevronContinuumAnimatedPreset'
// import harmonitoothPreset from './harmonitooth/harmonitoothPreset'

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

const accessChildObjectOrCreatePath = ({ parentObject, nestedPropertyPath }) => {
	let childObject = parentObject
	nestedPropertyPath.forEach(pathStep => {
		if (!childObject[ pathStep ]) childObject[ pathStep ] = {}
		childObject = childObject[ pathStep ]
	})
	return childObject
}

const callFunctionsPerStateProperty = ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let stateObjectToCallFunctionOn = accessChildObjectOrCreatePath({ parentObject: state, nestedPropertyPath })
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
		if (overridingProperty && typeof overridingProperty === 'object') {
			applyOverrides({
				objectWithPropertiesToOverride,
				overrides: overridingProperty,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName })
			})
		} else {
			let objectWithPropertyToOverride = accessChildObjectOrCreatePath({
				parentObject: objectWithPropertiesToOverride,
				nestedPropertyPath
			})
			objectWithPropertyToOverride[ propertyName ] = overridingProperty
		}
	})
}

const setup = ({ presets }) => {
	const { presetState, presetIterations, presetAnimations } = processPresets({ presets })
	setupObject({ objectToSetup: state, defaults: defaultState, presets: presetState, overrides: overrideState })
	setupObject({
		objectToSetup: iterations,
		defaults: defaultIterations,
		presets: presetIterations,
		overrides: overrideIterations
	})
	setupObject({
		objectToSetup: animations,
		defaults: defaultAnimations,
		presets: presetAnimations,
		overrides: overrideAnimations
	})
	setupCanvas()
}

const processPresets = ({ presets }) => {
	const presetState = {}
	const presetIterations = {}
	const presetAnimations = {}

	presets.forEach(preset => {
		applyOverrides({ objectWithPropertiesToOverride: presetState, overrides: preset.state })
		applyOverrides({ objectWithPropertiesToOverride: presetIterations, overrides: preset.iterations })
		applyOverrides({ objectWithPropertiesToOverride: presetAnimations, overrides: preset.animations })
	})

	return { presetState, presetIterations, presetAnimations }
}

const setupObject = ({ objectToSetup, defaults, presets, overrides }) => {
	resetObject({ objectToReset: objectToSetup, objectToResetTo: defaults })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: presets })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: overrides })
}

const executeIteration = ({ pattern, iterationFunctions }) => {
	currentIteration.currentIteration = 0
	const { startIteration, endIteration } = state.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) pattern()
		callFunctionsPerStateProperty({ functionObjects: iterationFunctions })
	}
}

const executePattern = ({ pattern, iterationFunctions }) => {
	if (iterating) {
		executeIteration({ pattern, iterationFunctions })
	} else {
		// console.time('pattern');
		pattern()
		// console.timeEnd('pattern');
	}
}

const executeAnimation = ({ pattern, iterationFunctions }) => {
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
			resetObject({ objectToReset: state, objectToResetTo: preIterationState })
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

const execute = ({ pattern }) => {
	const executionFunction = animating ? executeAnimation : executePattern
	executionFunction({
		pattern,
		iterationFunctions: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations })
	})
}

const animating = true
const iterating = false
const exportFrames = false
const pattern = standard
const presets = [
	// cmyktoothPreset,
	ginghamChevronContinuumAnimatedPreset,
	// harmonitoothPreset
]
setup({ presets })
// console.log(state)
execute({ pattern })
