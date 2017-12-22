import checkSettingForConflict from './checkSettingForConflict'
import mapOverPattern from './mapOverPattern'
import { PatternsHaveConflictsParams } from './types'

const patternsHaveConflicts: (_: PatternsHaveConflictsParams) => boolean =
	({ pattern = {}, patternName, patternCheckingAgainst = {} }: PatternsHaveConflictsParams): boolean =>
		mapOverPattern({
			options: { patternCheckingAgainst },
			pattern,
			patternName,
			perLeaf: checkSettingForConflict,
		})

export default patternsHaveConflicts
