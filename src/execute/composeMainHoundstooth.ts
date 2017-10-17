import { console } from '../utilities/windowWrapper'
import { Pattern, defaults, Houndstooth } from '../store'
import state from '../state'
import combineHoundstoothEffects from './combineHoundstoothEffects'
import composePatterns from './composePatterns'

const composeMainHoundstooth: {
	({}?: {
		houndstoothEffects?: Houndstooth[],
		houndstoothOverrides?: Houndstooth,
		logComposedMainHoundstooth?: boolean,
	}): void,
} = params => {
	const { houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth = false } = params || {}
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	composePattern({
		patternToCompose: state.mainHoundstooth.basePattern || {},
		patternDefaults: defaults.DEFAULT_HOUNDSTOOTH.basePattern || {},
		patternEffects: combinedHoundstoothEffects.basePattern || {},
		patternOverrides: houndstoothOverrides.basePattern || {},
	})
	composePattern({
		patternToCompose: state.mainHoundstooth.layersPattern || {},
		patternDefaults: defaults.DEFAULT_HOUNDSTOOTH.layersPattern || {},
		patternEffects: combinedHoundstoothEffects.layersPattern || {},
		patternOverrides: houndstoothOverrides.layersPattern || {},
	})
	composePattern({
		patternToCompose: state.mainHoundstooth.animationsPattern || {},
		patternDefaults: defaults.DEFAULT_HOUNDSTOOTH.animationsPattern || {},
		patternEffects: combinedHoundstoothEffects.animationsPattern || {},
		patternOverrides: houndstoothOverrides.animationsPattern || {},
	})

	if (logComposedMainHoundstooth) {
		console.log(state.mainHoundstooth)
	}
}

const composePattern: {
	({}: {
		patternDefaults: Pattern,
		patternEffects: Pattern,
		patternOverrides: Pattern,
		patternToCompose: Pattern,
	}): void,
} = ({ patternDefaults, patternEffects, patternOverrides, patternToCompose }) => {
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
