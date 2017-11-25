// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as from from '../../from'
import { codeUtilities } from '../../utilities'
import { Color, ShapeColorIndex } from './types'

const getColor: (_: { index: ShapeColorIndex }) => Color =
	({ index }: { index: ShapeColorIndex }): Color =>
		codeUtilities.wrappedIndex({
			array: getFromBaseOrDefaultPattern('colorSet'),
			index: from.ShapeColorIndex(index),
		})

export { getColor as main }
