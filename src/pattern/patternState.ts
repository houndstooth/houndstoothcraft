import { codeUtilities } from '../utilities'

import { DEFAULT_PATTERN_STATE } from './defaults'
import { FullPatternBaseValues } from './types'

const patternState: FullPatternBaseValues = codeUtilities.deepClone(DEFAULT_PATTERN_STATE)

export { patternState }
