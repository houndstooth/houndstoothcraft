import stateUtilities from '../utilities/stateUtilities'
import consoleWrapper from '../application/consoleWrapper'
import patternDefaults from './patternDefaults'

export default ({ patternEffects = [], patternOverrides = {}, logPattern } = {}) => {
	const combinedPatternEffects = combinePatternEffects({ patternEffects })

	if (
		!combinedPatternEffects ||
		!stateUtilities.confirmPatternHasNoNonSettings(currentState.builtPattern) ||
		!stateUtilities.confirmPatternHasNoNonSettings(patternOverrides) ||
		!stateUtilities.confirmPatternHasNoNonSettings(patternDefaults)
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

	if (logPattern) consoleWrapper.log(currentState.builtPattern)
}

const buildSettings = ({ settingsToSetup, patternDefaults, patternEffects, patternOverrides }) => {
	Object.keys(settingsToSetup).forEach(key => delete settingsToSetup[ key ])
	stateUtilities.mergeSettings({
		settingsToBeMergedOnto: settingsToSetup,
		settingsToMerge: patternDefaults,
	})
	stateUtilities.mergeSettings({
		settingsToBeMergedOnto: settingsToSetup,
		settingsToMerge: patternEffects,
	})
	stateUtilities.mergeSettings({
		settingsToBeMergedOnto: settingsToSetup,
		settingsToMerge: patternOverrides,
	})
}

const combinePatternEffects = ({ patternEffects }) => {
	const base = {}
	const iterations = {}
	const animations = {}

	const { mergeSettings, confirmPatternHasNoNonSettings } = stateUtilities

	let anyIssues = false
	patternEffects.forEach(patternEffect => {
		if (!confirmPatternHasNoNonSettings(patternEffect)) {
			anyIssues = true
			return
		}
		mergeSettings({
			settingsToBeMergedOnto: base,
			settingsToMerge: patternEffect.base,
		})
		mergeSettings({
			settingsToBeMergedOnto: iterations,
			settingsToMerge: patternEffect.iterations,
		})
		mergeSettings({
			settingsToBeMergedOnto: animations,
			settingsToMerge: patternEffect.animations,
		})
	})

	if (anyIssues) {
		return null
	}
	return { base, iterations, animations }
}
