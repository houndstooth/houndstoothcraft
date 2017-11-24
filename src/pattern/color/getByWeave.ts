// tslint:disable-next-line:no-reaching-imports
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as from from '../../from'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { GetShapeColorIndicesWithOffset, GetShapeColorIndicesWithOffsetParams, ShapeColorIndex, Weave } from './types'

const getByWeave: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const { rows, columns }: Weave = getFromBaseOrDefaultPattern('weave')

		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const columnsIndex: ShapeColorIndex = to.ShapeColorIndex(codeUtilities.wrappedIndex({
			array: columns,
			index: x + xOffset,
		}))
		const rowsIndex: ShapeColorIndex = to.ShapeColorIndex(codeUtilities.wrappedIndex({
			array: rows,
			index: y + yOffset,
		}))

		return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
	}

export { getByWeave }
