import setupCanvas from './render/setupCanvas'
import defaultIterations from './state/defaultIterations'
import overrideIterations from './state/overrideIterations'
import iterations from './state/iterations'
import defaultAnimations from './state/defaultAnimations'
import overrideAnimations from './state/overrideAnimations'
import animations from './state/animations'
import defaultState from './state/defaultState'
import overrideState from './state/overrideState'
import state from './state/state'
import applicationUtilities from './utilities/applicationUtilities'

export default ({ effects, debugging }) => {
	const { effectState, effectIterations, effectAnimations } = processEffects({ effects })
	setupObject({ objectToSetup: state, defaults: defaultState, effects: effectState, overrides: overrideState })
	setupObject({
		objectToSetup: iterations,
		defaults: defaultIterations,
		effects: effectIterations,
		overrides: overrideIterations
	})
	setupObject({
		objectToSetup: animations,
		defaults: defaultAnimations,
		effects: effectAnimations,
		overrides: overrideAnimations
	})
	setupCanvas()
	if (debugging) console.log(state)
}

const applyOverrides = ({ objectWithPropertiesToOverride, overrides, nestedPropertyPath = [] }) => {
	const { deeperPath, accessChildObjectOrCreatePath } = applicationUtilities
	overrides && Object.entries(overrides).forEach(([ propertyName, overridingProperty ]) => {
		if (overridingProperty && typeof overridingProperty === 'object' && !overridingProperty.length) {
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

const setupObject = ({ objectToSetup, defaults, effects, overrides }) => {
	applicationUtilities.resetObject({ objectToReset: objectToSetup, objectToResetTo: defaults })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: effects })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: overrides })
}

const processEffects = ({ effects }) => {
	const effectState = {}
	const effectIterations = {}
	const effectAnimations = {}

	effects.forEach(effect => {
		applyOverrides({ objectWithPropertiesToOverride: effectState, overrides: effect.state })
		applyOverrides({ objectWithPropertiesToOverride: effectIterations, overrides: effect.iterations })
		applyOverrides({ objectWithPropertiesToOverride: effectAnimations, overrides: effect.animations })
	})

	return { effectState, effectIterations, effectAnimations }
}
