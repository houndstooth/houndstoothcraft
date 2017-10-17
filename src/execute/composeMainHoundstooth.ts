import state from '../state'
import { defaults, Houndstooth, Pattern } from '../store'
import { console } from '../utilities/windowWrapper'
import combineHoundstoothEffects from './combineHoundstoothEffects'
import composePatterns from './composePatterns'

const composeMainHoundstooth: ({}?: {
		houndstoothEffects?: Houndstooth[],
		houndstoothOverrides?: Houndstooth,
		logComposedMainHoundstooth?: boolean,
	}) => void = params => {
	const { houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth = false } = params || {}
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	composePattern({
		patternDefaults: defaults.DEFAULT_HOUNDSTOOTH.basePattern || {},
		patternEffects: combinedHoundstoothEffects.basePattern || {},
		patternOverrides: houndstoothOverrides.basePattern || {},
		patternToCompose: state.mainHoundstooth.basePattern || {},
	})
	composePattern({
		patternDefaults: defaults.DEFAULT_HOUNDSTOOTH.layersPattern || {},
		patternEffects: combinedHoundstoothEffects.layersPattern || {},
		patternOverrides: houndstoothOverrides.layersPattern || {},
		patternToCompose: state.mainHoundstooth.layersPattern || {},
	})
	composePattern({
		patternDefaults: defaults.DEFAULT_HOUNDSTOOTH.animationsPattern || {},
		patternEffects: combinedHoundstoothEffects.animationsPattern || {},
		patternOverrides: houndstoothOverrides.animationsPattern || {},
		patternToCompose: state.mainHoundstooth.animationsPattern || {},
	})

	if (logComposedMainHoundstooth) {
		console.log(state.mainHoundstooth)
	}
}

const composePattern: (_: {
		patternDefaults: Pattern,
		patternEffects: Pattern,
		patternOverrides: Pattern,
		patternToCompose: Pattern,
	}) => void = ({ patternDefaults, patternEffects, patternOverrides, patternToCompose }) => {
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
