import { Houndstooth } from '../store'
import composePatterns from './composePatterns'

const combineHoundstoothEffects: (_: {
	houndstoothEffects: Houndstooth[],
}) => Houndstooth = ({ houndstoothEffects }) => {
	const basePattern = {}
	const layersPattern = {}
	const animationsPattern = {}

	houndstoothEffects.forEach(houndstoothEffect => {
		composePatterns({
			patternToBeMergedOnto: basePattern || {},
			patternToMerge: houndstoothEffect.basePattern || {},
			warnAboutConflicts: true,
		})
		composePatterns({
			patternToBeMergedOnto: layersPattern || {},
			patternToMerge: houndstoothEffect.layersPattern || {},
			warnAboutConflicts: true,
		})
		composePatterns({
			patternToBeMergedOnto: animationsPattern || {},
			patternToMerge: houndstoothEffect.animationsPattern || {},
			warnAboutConflicts: true,
		})
	})

	return { basePattern, layersPattern, animationsPattern }
}

export default combineHoundstoothEffects
