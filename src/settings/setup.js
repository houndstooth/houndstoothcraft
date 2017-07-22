import settingsUtilities from '../utilities/settingsUtilities'
import consoleWrapper from '../application/consoleWrapper'
import setupCanvas from '../render/setupCanvas'
import defaultSettings from './defaultSettings'

export default ({ effects = [], settingsLogging, overrides = {} } = {}) => {
	const combinedEffects = combineEffects({ effects })

	if (
		!combinedEffects ||
		!settingsUtilities.confirmPatternHasNoNonSettings(currentState.settings) ||
		!settingsUtilities.confirmPatternHasNoNonSettings(overrides) ||
		!settingsUtilities.confirmPatternHasNoNonSettings(defaultSettings)
	) {
		return
	}

	setupSettings({
		defaults: defaultSettings.base,
		settingsToSetup: currentState.settings.base,
		effects: combinedEffects.base,
		overrides: overrides.base,
	})
	setupSettings({
		settingsToSetup: currentState.settings.iterations,
		defaults: defaultSettings.iterations,
		effects: combinedEffects.iterations,
		overrides: overrides.iterations,
	})
	setupSettings({
		settingsToSetup: currentState.settings.animations,
		defaults: defaultSettings.animations,
		effects: combinedEffects.animations,
		overrides: overrides.animations,
	})

	setupCanvas()

	if (settingsLogging) consoleWrapper.log(currentState.settings)
}

const setupSettings = ({ settingsToSetup, defaults, effects, overrides }) => {
	Object.keys(settingsToSetup).forEach(key => delete settingsToSetup[ key ])
	settingsUtilities.applyOverrides({
		settingsWithSettingsToBeOverridden: settingsToSetup,
		settingsWithSettingsOverrides: defaults,
	})
	settingsUtilities.applyOverrides({
		settingsWithSettingsToBeOverridden: settingsToSetup,
		settingsWithSettingsOverrides: effects,
	})
	settingsUtilities.applyOverrides({
		settingsWithSettingsToBeOverridden: settingsToSetup,
		settingsWithSettingsOverrides: overrides,
	})
}

const combineEffects = ({ effects }) => {
	const base = {}
	const iterations = {}
	const animations = {}

	const { applyOverrides, confirmPatternHasNoNonSettings } = settingsUtilities

	let anyIssues = false
	effects.forEach(effect => {
		if (!confirmPatternHasNoNonSettings(effect)) {
			anyIssues = true
			return
		}
		applyOverrides({
			settingsWithSettingsToBeOverridden: base,
			settingsWithSettingsOverrides: effect.base,
		})
		applyOverrides({
			settingsWithSettingsToBeOverridden: iterations,
			settingsWithSettingsOverrides: effect.iterations,
		})
		applyOverrides({
			settingsWithSettingsToBeOverridden: animations,
			settingsWithSettingsOverrides: effect.animations,
		})
	})

	if (anyIssues) {
		return null
	}
	return { base, iterations, animations }
}
