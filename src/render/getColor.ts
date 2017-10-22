import { getFromBaseOrDefaultPattern } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import { Color } from './types'
import { ShapeColorIndex } from '../components'
import * as from from '../utilities/from'

const getColor: (_: { index: ShapeColorIndex }) => Color = ({ index }) =>
	wrappedIndex({
		array: getFromBaseOrDefaultPattern('colorSet'),
		index: from.ShapeColorIndex(index),
	})

export { getColor }
