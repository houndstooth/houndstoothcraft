import { ShapeColorIndex } from '../components'
import { getFromBaseOrDefaultPattern } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import { Color } from './types'

const getColor: (_: { index: ShapeColorIndex }) => Color = ({ index }) =>
	wrappedIndex({
		array: getFromBaseOrDefaultPattern('colorSet'),
		index: from.ShapeColorIndex(index),
	})

export { getColor }
