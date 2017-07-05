import settingsUtilities from '../utilities/settingsUtilities'
import consoleWrapper from './consoleWrapper'

export default ({ effects = [], settingsLogging, overrides = {} } = {}) => {
	const combinedEffects = combineEffects({ effects })

	setupObject({
		objectToSetup: current.settings.initial,
		effects: combinedEffects.initial,
		overrides: overrides.initial,
	})
	setupObject({
		objectToSetup: current.settings.iterations,
		effects: combinedEffects.iterations,
		overrides: overrides.iterations,
	})
	setupObject({
		objectToSetup: current.settings.animations,
		effects: combinedEffects.animations,
		overrides: overrides.animations,
	})

	if (settingsLogging) consoleWrapper.log(current.settings)
}

const setupObject = ({ objectToSetup, effects, overrides }) => {
	Object.keys(objectToSetup).forEach(key => delete objectToSetup[ key ])
	settingsUtilities.applyOverrides({
		objectWithPropertiesToBeOverridden: objectToSetup,
		objectWithPropertyOverrides: effects,
	})
	settingsUtilities.applyOverrides({
		objectWithPropertiesToBeOverridden: objectToSetup,
		objectWithPropertyOverrides: overrides,
	})
}

const combineEffects = ({ effects }) => {
	const initial = {}
	const iterations = {}
	const animations = {}

	const { applyOverrides } = settingsUtilities

	effects.forEach(effect => {
		applyOverrides({
			objectWithPropertiesToBeOverridden: initial,
			objectWithPropertyOverrides: effect.initial,
		})
		applyOverrides({
			objectWithPropertiesToBeOverridden: iterations,
			objectWithPropertyOverrides: effect.iterations,
		})
		applyOverrides({
			objectWithPropertiesToBeOverridden: animations,
			objectWithPropertyOverrides: effect.animations,
		})
	})

	return { initial, iterations, animations }
}
