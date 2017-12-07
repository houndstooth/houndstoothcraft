import { codeUtilities, from } from '../../utilities'
import { get } from '../patternState'
import {
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndicesWithOffsetParams,
	ShapeColorIndex,
	Supertile,
} from './types'

const getBySupertile: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const supertile: Supertile = get('supertile')
		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const supertileColumn: ShapeColorIndex[][] = codeUtilities.wrappedIndex({
			array: supertile,
			index: x + xOffset,
		})

		return codeUtilities.wrappedIndex({ array: supertileColumn, index: y + yOffset })
	}

export default getBySupertile
