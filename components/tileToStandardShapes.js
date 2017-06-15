import shape from './shape'
import combineShapesWithEitherSquareShapeOrStripeShapes from './combineShapesWithEitherSquareShapeOrStripeShapes'

export default ({ address, tileColors }) => {
	const shapes = shape
	combineShapesWithEitherSquareShapeOrStripeShapes({
		address,
		tileColors,
		shapes
	})
}
