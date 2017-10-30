import { reversed } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { ShapeColorIndex, TransformShapeColorIndices, TransformShapeColorIndicesParams } from './types'

const SWITCHEROO_SIZE: number = 4

const applySwitcheroo: TransformShapeColorIndices =
	({ gridAddress, shapeColorIndices }: TransformShapeColorIndicesParams): ShapeColorIndex[] => {
		const [ x, y ]: number[] = from.Address(gridAddress)
		const xMod: number = x % SWITCHEROO_SIZE
		const yMod: number = y % SWITCHEROO_SIZE
		if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
			return to.ShapeColorIndices(reversed(shapeColorIndices))
		}

		return shapeColorIndices
	}

export { applySwitcheroo }
