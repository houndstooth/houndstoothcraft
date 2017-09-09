import houndstoothHasOnlyRecognizedPatterns from './houndstoothHasOnlyRecognizedPatterns'
import composePatterns from './composePatterns'

export default ({ houndstoothEffects }) => {
	const basePattern = {}
	const layersPattern = {}
	const animationsPattern = {}

	let anyIssues = false
	houndstoothEffects.forEach(houndstoothEffect => {
		if (!houndstoothHasOnlyRecognizedPatterns(houndstoothEffect)) {
			anyIssues = true
			return
		}
		composePatterns({
			patternToBeMergedOnto: basePattern,
			patternToMerge: houndstoothEffect.basePattern,
			warnAboutConflicts: true,
		})
		composePatterns({
			patternToBeMergedOnto: layersPattern,
			patternToMerge: houndstoothEffect.layersPattern,
			warnAboutConflicts: true,
		})
		composePatterns({
			patternToBeMergedOnto: animationsPattern,
			patternToMerge: houndstoothEffect.animationsPattern,
			warnAboutConflicts: true,
		})
	})

	if (anyIssues) {
		return null
	}
	return { basePattern, layersPattern, animationsPattern }
}
