import settingsUtilities from '../utilities/settingsUtilities'
import consoleWrapper from '../application/consoleWrapper'
import setupCanvas from '../render/setupCanvas'
import defaultSettings from './defaultSettings'

export default ({ effects = [], settingsLogging, overrides = {} } = {}) => {
	const combinedEffects = combineEffects({ effects })

	if (
		!combinedEffects ||
		!settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects(current.settings) ||
		!settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects(overrides) ||
		!settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects(defaultSettings)
	) {
		return
	}

	setupObject({
		defaults: defaultSettings.initial,
		objectToSetup: current.settings.initial,
		effects: combinedEffects.initial,
		overrides: overrides.initial,
	})
	setupObject({
		objectToSetup: current.settings.iterations,
		defaults: defaultSettings.iterations,
		effects: combinedEffects.iterations,
		overrides: overrides.iterations,
	})
	setupObject({
		objectToSetup: current.settings.animations,
		defaults: defaultSettings.animations,
		effects: combinedEffects.animations,
		overrides: overrides.animations,
	})

	setupCanvas()

	if (settingsLogging) consoleWrapper.log(current.settings)
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
	const initial = {}
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

	if (anyIssues) {
		return null
	}
	return { initial, iterations, animations }
}
