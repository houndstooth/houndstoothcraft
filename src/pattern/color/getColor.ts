import { codeUtilities, from } from '../../utilities'
import { get } from '../patternState'
import { Color, ShapeColorIndex } from './types'

const getColor: (_: { index: ShapeColorIndex }) => Color =
	({ index }: { index: ShapeColorIndex }): Color =>
		codeUtilities.wrappedIndex({
			array: get('colorSet'),
			index: from.ShapeColorIndex(index),
		})

export default getColor
