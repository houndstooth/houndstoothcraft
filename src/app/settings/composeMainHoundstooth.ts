import { DEFAULT_ANIMATIONS_PATTERN, DEFAULT_BASE_PATTERN, DEFAULT_LAYERS_PATTERN } from '../../defaults'
import { Effect } from '../../pattern'
import { appState } from '../appState'
import { consoleWrapper } from '../dom'
import combineEffects from './combineEffects'
import composePatterns from './composePatterns'
import { ComposeMainHoundstooth, ComposePatternParams } from './types'

const composeMainHoundstooth: (_?: ComposeMainHoundstooth) => void =
	(params?: ComposeMainHoundstooth): void => {
		const {
			effects = [],
			overrides = {},
			logComposedMainHoundstooth = false,
		}: ComposeMainHoundstooth = params || {}

		const combinedEffects: Effect = combineEffects({ effects })

		composePattern({
			patternDefaults: DEFAULT_BASE_PATTERN,
			patternEffects: combinedEffects.basePattern,
			patternOverrides: overrides.basePattern,
			patternToCompose: appState.settings.mainHoundstooth.basePattern,
		})
		composePattern({
			patternDefaults: DEFAULT_LAYERS_PATTERN,
			patternEffects: combinedEffects.layersPattern,
			patternOverrides: overrides.layersPattern,
			patternToCompose: appState.settings.mainHoundstooth.layersPattern,
		})
		composePattern({
			patternDefaults: DEFAULT_ANIMATIONS_PATTERN,
			patternEffects: combinedEffects.animationsPattern,
			patternOverrides: overrides.animationsPattern,
			patternToCompose: appState.settings.mainHoundstooth.animationsPattern,
		})

		if (logComposedMainHoundstooth) {
			consoleWrapper.log(appState.settings.mainHoundstooth)
		}
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
