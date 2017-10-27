import { Address } from './Address'
import { ShapeColorIndex } from './ShapeColorIndex'

type TransformShapeColorIndices = (_: {
	gridAddress: Address, shapeColorIndices: ShapeColorIndex[],
}) => ShapeColorIndex[]

export { TransformShapeColorIndices }
