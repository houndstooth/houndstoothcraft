import storeUtilities from '../utilities/storeUtilities'

export default ({ houndstoothEffects }) => {
	const basePattern = {}
	const iterationsPattern = {}
	const animationsPattern = {}

	const { composePatterns, houndstoothHasOnlyRecognizedPatterns } = storeUtilities

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
			patternToBeMergedOnto: iterationsPattern,
			patternToMerge: houndstoothEffect.iterationsPattern,
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
	return { basePattern, iterationsPattern, animationsPattern }
}
