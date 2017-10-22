import { getFromBaseOrDefaultPattern } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import { Color } from './types'
import { TileColorIndex } from '../components'
import * as from from '../utilities/from'

const getColor: (_: { index: TileColorIndex }) => Color = ({ index }) =>
	wrappedIndex({
		array: getFromBaseOrDefaultPattern('colorSet'),
		index: from.TileColorIndex(index),
	})

export { getColor }
