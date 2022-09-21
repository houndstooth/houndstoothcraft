import { Color } from '../../types'
import { codeUtilities, from } from '../../utilities'
import { patternState } from '../patternState'

import { ShapeColorIndex } from './types'

const getColor: (_: { index: ShapeColorIndex }) => Color =
	({ index }: { index: ShapeColorIndex }): Color =>
		codeUtilities.wrappedIndex({
			array: patternState.colorSettings.colorSet,
			index: from.ShapeColorIndex(index),
		})

export default getColor
