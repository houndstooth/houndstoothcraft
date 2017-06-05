import render from '../render/render'
import rotationUtilities from '../utilities/rotationUtilities'
import wrappedIndex from '../utilities/wrappedIndex'
import transpositionUtilities from '../utilities/transpositionUtilities'

export default ({ address, tileColors, stripeIndex, coordinatesFunction, coordinatesOptions }) => {
	const { origin, sizedUnit } = transpositionUtilities.getOriginAndSizedUnit({ address })
	if (!origin) return

	const shapeColor = wrappedIndex({ array: tileColors, index: stripeIndex })
	if (shapeColor.a === 0) return

	let coordinates = coordinatesFunction({ origin, sizedUnit, coordinatesOptions })
	if (!coordinates) return
	coordinates = rotationUtilities.applyRotation({ coordinates, origin, sizedUnit })

	render({ shapeColor, coordinates })
}
