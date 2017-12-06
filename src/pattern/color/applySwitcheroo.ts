import { codeUtilities, from, to } from '../../utilities'
import { ShapeColorIndex, TransformShapeColorIndices, TransformShapeColorIndicesParams } from './types'

const SWITCHEROO_SIZE: number = 4

const applySwitcheroo: TransformShapeColorIndices =
	({ gridAddress, shapeColorIndices }: TransformShapeColorIndicesParams): ShapeColorIndex[] => {
		const [ x, y ]: number[] = from.Address(gridAddress)
		const xMod: number = x % SWITCHEROO_SIZE
		const yMod: number = y % SWITCHEROO_SIZE
		if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
			return to.ShapeColorIndices(codeUtilities.reversed(shapeColorIndices))
		}

		return shapeColorIndices
	}

export default applySwitcheroo
