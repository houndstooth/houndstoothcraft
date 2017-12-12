import { codeUtilities, from, to } from '../../utilities'
import { patternState } from '../patternState'
import { GetShapeColorIndicesWithOffset, GetShapeColorIndicesWithOffsetParams, ShapeColorIndex, Weave } from './types'

const getByWeave: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const { rows, columns }: Weave = patternState.colorSettings.colorAssignmentSettings.weave

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

export default getByWeave
