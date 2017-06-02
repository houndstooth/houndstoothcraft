import render from '../render/render'
import rotationUtilities from '../utilities/rotationUtilities'
import wrappedIndex from '../utilities/wrappedIndex'

export default ({ origin, rotation, colors, stripeIndex, sizedUnit, coordinatesFunction, coordinatesOptions }) => {
	const color = wrappedIndex({ array: colors, index: stripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({ origin, sizedUnit, coordinatesOptions })
	if (!coordinates) return

	const { maybeRotateCoordinates, calculateCenter } = rotationUtilities
	coordinates = maybeRotateCoordinates({ coordinates, center: calculateCenter({ origin, sizedUnit }), rotation })
	render({ color, coordinates })
}
