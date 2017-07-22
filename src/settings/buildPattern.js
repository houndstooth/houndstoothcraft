import settingsUtilities from '../utilities/settingsUtilities'
import consoleWrapper from '../application/consoleWrapper'
import setupCanvas from '../render/setupCanvas'
import patternDefaults from './patternDefaults'

export default ({ patternEffects = [], patternOverrides = {}, logPattern } = {}) => {
	const combinedPatternEffects = combinePatternEffects({ patternEffects })

	if (
		!combinedPatternEffects ||
		!settingsUtilities.confirmPatternHasNoNonSettings(currentState.builtPattern) ||
		!settingsUtilities.confirmPatternHasNoNonSettings(patternOverrides) ||
		!settingsUtilities.confirmPatternHasNoNonSettings(patternDefaults)
	) {
		return
	}

	buildSettings({
		settingsToSetup: currentState.builtPattern.base,
		patternDefaults: patternDefaults.base,
		patternEffects: combinedPatternEffects.base,
		patternOverrides: patternOverrides.base,
	})
	buildSettings({
		settingsToSetup: currentState.builtPattern.iterations,
		patternDefaults: patternDefaults.iterations,
		patternEffects: combinedPatternEffects.iterations,
		patternOverrides: patternOverrides.iterations,
	})
	buildSettings({
		settingsToSetup: currentState.builtPattern.animations,
		patternDefaults: patternDefaults.animations,
		patternEffects: combinedPatternEffects.animations,
		patternOverrides: patternOverrides.animations,
	})

	setupCanvas()

	if (logPattern) consoleWrapper.log(currentState.builtPattern)
}

const buildSettings = ({ settingsToSetup, patternDefaults, patternEffects, patternOverrides }) => {
	Object.keys(settingsToSetup).forEach(key => delete settingsToSetup[ key ])
	settingsUtilities.applyOverrides({
		settingsWithSettingsToBeOverridden: settingsToSetup,
		settingsWithSettingsOverrides: patternDefaults,
	})
	settingsUtilities.applyOverrides({
		settingsWithSettingsToBeOverridden: settingsToSetup,
		settingsWithSettingsOverrides: patternEffects,
	})
	settingsUtilities.applyOverrides({
		settingsWithSettingsToBeOverridden: settingsToSetup,
		settingsWithSettingsOverrides: patternOverrides,
	})
}

const combinePatternEffects = ({ patternEffects }) => {
	const base = {}
	const iterations = {}
	const animations = {}

	const { applyOverrides, confirmPatternHasNoNonSettings } = settingsUtilities

	let anyIssues = false
	patternEffects.forEach(patternEffect => {
		if (!confirmPatternHasNoNonSettings(patternEffect)) {
			anyIssues = true
			return
		}
		applyOverrides({
			settingsWithSettingsToBeOverridden: base,
			settingsWithSettingsOverrides: patternEffect.base,
		})
		applyOverrides({
			settingsWithSettingsToBeOverridden: iterations,
			settingsWithSettingsOverrides: patternEffect.iterations,
		})
		applyOverrides({
			settingsWithSettingsToBeOverridden: animations,
			settingsWithSettingsOverrides: patternEffect.animations,
		})
	})

	if (anyIssues) {
		return null
	}
	return { base, iterations, animations }
}
