import { codeUtilities, from } from '../../utilities'
import { patternState } from '../patternState'
import {
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndicesWithOffsetParams,
	ShapeColorIndex,
	Supertile,
} from './types'

const getBySupertile: GetShapeColorIndicesWithOffset =
	({ addressOffset, address }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const supertile: Supertile = patternState.colorSettings.colorAssignmentSettings.supertile
		const [ x, y ]: number[] = from.Address(address)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const supertileColumn: ShapeColorIndex[][] = codeUtilities.wrappedIndex({
			array: supertile,
			index: x + xOffset,
		})

		return codeUtilities.wrappedIndex({ array: supertileColumn, index: y + yOffset })
	}

export default getBySupertile
