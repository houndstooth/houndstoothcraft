import render from '../render/render'
import rotationUtilities from '../utilities/rotationUtilities'
import wrappedIndex from '../utilities/wrappedIndex'
import transpositionUtilities from '../utilities/transpositionUtilities'

export default ({ address, colors, stripeIndex, coordinatesFunction, coordinatesOptions }) => {
	const { origin, sizedUnit } = transpositionUtilities.calculateOriginAndSizedUnit({ address })

	const color = wrappedIndex({ array: colors, index: stripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({ origin, sizedUnit, coordinatesOptions })
	if (!coordinates) return

	const { maybeRotateCoordinates, calculateCenter } = rotationUtilities
	coordinates = maybeRotateCoordinates({ coordinates, center: calculateCenter({ origin, sizedUnit }) })
	render({ color, coordinates })
}
