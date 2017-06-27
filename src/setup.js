import setupCanvas from './render/setupCanvas'
import overrides from './settings/overrides'
import applicationUtilities from './utilities/applicationUtilities'
import consoleWrapper from './consoleWrapper'

export default ({ effects = [], configurationLogging } = {}) => {
	const combinedEffects = combineEffects({ effects })

	setupObject({
		objectToSetup: settings.initial,
		effects: combinedEffects.initial,
		overrides: overrides.initial
	})
	setupObject({
		objectToSetup: settings.iterations,
		effects: combinedEffects.iterations,
		overrides: overrides.iterations
	})
	setupObject({
		objectToSetup: settings.animations,
		effects: combinedEffects.animations,
		overrides: overrides.animations
	})

	setupCanvas()

	if (configurationLogging) consoleWrapper.log(settings)
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

const combineEffects = ({ effects }) => {
	const initial = {}
	const iterations = {}
	const animations = {}

	effects.forEach(effect => {
		applyOverrides({ objectWithPropertiesToOverride: initial, overrides: effect.initial })
		applyOverrides({ objectWithPropertiesToOverride: iterations, overrides: effect.iterations })
		applyOverrides({ objectWithPropertiesToOverride: animations, overrides: effect.animations })
	})

	return { initial, iterations, animations }
}
