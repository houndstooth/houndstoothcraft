import { getSetting } from '../../app'
import * as from from '../../from'
import { codeUtilities } from '../../utilities'
import { Color, ShapeColorIndex } from './types'

const getColor: (_: { index: ShapeColorIndex }) => Color =
	({ index }: { index: ShapeColorIndex }): Color =>
		codeUtilities.wrappedIndex({
			array: getSetting.main('colorSet'),
			index: from.ShapeColorIndex(index),
		})

export { getColor as main }
