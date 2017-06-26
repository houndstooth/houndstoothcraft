import setupCanvas from './render/setupCanvas'
import overrideIterations from './state/overrideIterations'
import iterations from './state/iterations'
import overrideAnimations from './state/overrideAnimations'
import animations from './state/animations'
import overrideState from './state/overrideState'
import state from './state/state'
import applicationUtilities from './utilities/applicationUtilities'
import consoleWrapper from './consoleWrapper'

export default ({ effects = [], configurationLogging } = {}) => {
	const { effectState, effectIterations, effectAnimations } = processEffects({ effects })

	setupObject({
		objectToSetup: state,
		effects: effectState,
		overrides: overrideState
	})
	setupObject({
		objectToSetup: iterations,
		effects: effectIterations,
		overrides: overrideIterations
	})
	setupObject({
		objectToSetup: animations,
		effects: effectAnimations,
		overrides: overrideAnimations
	})

	setupCanvas()

	if (configurationLogging) consoleWrapper.log(state)
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

const setupObject = ({ objectToSetup, effects, overrides }) => {
	Object.keys(objectToSetup).forEach(key => delete objectToSetup[ key ])
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
