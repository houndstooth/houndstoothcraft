// tslint:disable-next-line:no-reaching-imports
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as from from '../../from'
import { codeUtilities } from '../../utilities'
import {
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndicesWithOffsetParams,
	ShapeColorIndex,
	Supertile,
} from './types'

const getBySupertile: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const supertile: Supertile = getFromBaseOrDefaultPattern('supertile')
		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const supertileColumn: ShapeColorIndex[][] = codeUtilities.wrappedIndex({
			array: supertile,
			index: x + xOffset,
		})

		return codeUtilities.wrappedIndex({ array: supertileColumn, index: y + yOffset })
	}

export { getBySupertile }
