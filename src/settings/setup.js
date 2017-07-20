import settingsUtilities from '../utilities/settingsUtilities'
import consoleWrapper from '../application/consoleWrapper'
import setupCanvas from '../render/setupCanvas'
import defaultSettings from './defaultSettings'

export default ({ effects = [], settingsLogging, overrides = {} } = {}) => {
	const combinedEffects = combineEffects({ effects })

	if (
		!combinedEffects ||
		!settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects(currentState.settings) ||
		!settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects(overrides) ||
		!settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects(defaultSettings)
	) {
		return
	}

	setupObject({
		defaults: defaultSettings.base,
		objectToSetup: currentState.settings.base,
		effects: combinedEffects.base,
		overrides: overrides.base,
	})
	setupObject({
		objectToSetup: currentState.settings.iterations,
		defaults: defaultSettings.iterations,
		effects: combinedEffects.iterations,
		overrides: overrides.iterations,
	})
	setupObject({
		objectToSetup: currentState.settings.animations,
		defaults: defaultSettings.animations,
		effects: combinedEffects.animations,
		overrides: overrides.animations,
	})

	setupCanvas()

	if (settingsLogging) consoleWrapper.log(currentState.settings)
}

const setupObject = ({ objectToSetup, defaults, effects, overrides }) => {
	Object.keys(objectToSetup).forEach(key => delete objectToSetup[ key ])
	settingsUtilities.applyOverrides({
		objectWithPropertiesToBeOverridden: objectToSetup,
		objectWithPropertyOverrides: defaults,
	})
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
	const base = {}
	const iterations = {}
	const animations = {}

	const { applyOverrides, confirmSettingsObjectsParentIncludesOnlySettingsObjects } = settingsUtilities

	let anyIssues = false
	effects.forEach(effect => {
		if (!confirmSettingsObjectsParentIncludesOnlySettingsObjects(effect)) {
			anyIssues = true
			return
		}
		applyOverrides({
			objectWithPropertiesToBeOverridden: base,
			objectWithPropertyOverrides: effect.base,
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

	if (anyIssues) {
		return null
	}
	return { base, iterations, animations }
}
