import { appState } from '../appState'
import composePatterns from './composePatterns'
import { DEFAULT_ANIMATIONS_PATTERN, DEFAULT_BASE_PATTERN, DEFAULT_LAYERS_PATTERN } from './defaults'
import { ComposePatternParams } from './types'

const composeMainHoundstooth: () => void =
	(): void => {
		composePattern({
			patternDefaults: DEFAULT_BASE_PATTERN,
			patternEffects: appState.settings.combinedEffects.basePattern,
			patternOverrides: appState.settings.overrides.basePattern,
			patternToCompose: appState.settings.mainHoundstooth.basePattern,
		})
		composePattern({
			patternDefaults: DEFAULT_LAYERS_PATTERN,
			patternEffects: appState.settings.combinedEffects.layersPattern,
			patternOverrides: appState.settings.overrides.layersPattern,
			patternToCompose: appState.settings.mainHoundstooth.layersPattern,
		})
		composePattern({
			patternDefaults: DEFAULT_ANIMATIONS_PATTERN,
			patternEffects: appState.settings.combinedEffects.animationsPattern,
			patternOverrides: appState.settings.overrides.animationsPattern,
			patternToCompose: appState.settings.mainHoundstooth.animationsPattern,
		})
	}

const composePattern: (_: ComposePatternParams) => void =
	({ patternDefaults, patternEffects, patternOverrides = {}, patternToCompose }: ComposePatternParams): void => {
		composePatterns({
			patternToBeMergedOnto: patternToCompose,
			patternToMerge: patternDefaults,
		})
		composePatterns({
			patternToBeMergedOnto: patternToCompose,
			patternToMerge: patternEffects,
		})
		composePatterns({
			patternToBeMergedOnto: patternToCompose,
			patternToMerge: patternOverrides,
		})
	}

export default composeMainHoundstooth
