import shape from './shape'
import combineShapesWithEitherSquareShapeOrStripeShapes from './combineShapesWithEitherSquareShapeOrStripeShapes'

export default ({ address, tileColors, tileOrigin, sizedUnit }) => {
	const shapes = shape
	combineShapesWithEitherSquareShapeOrStripeShapes({
		address,
		tileColors,
		shapes,
		tileOrigin,
		sizedUnit
	})
}
