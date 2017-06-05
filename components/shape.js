import render from '../render/render'
import rotationUtilities from '../utilities/rotationUtilities'
import codeUtilities from '../utilities/codeUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import square from '../shapes/square'
import stripe from '../shapes/stripe'

export default ({ address, tileColors, stripeIndex, coordinatesFunction, coordinatesOptions }) => {
	const { origin, sizedUnit } = transpositionUtilities.getOriginAndSizedUnit({ address })
	if (!origin) return

	const shapeColor = codeUtilities.wrappedIndex({ array: tileColors, index: stripeIndex })
	if (shapeColor.a === 0) return

	if (!coordinatesFunction) coordinatesFunction = coordinatesOptions ? stripe : square
	let coordinates = coordinatesFunction({ origin, sizedUnit, coordinatesOptions })
	if (!coordinates) return
	coordinates = rotationUtilities.applyRotation({ coordinates, origin, sizedUnit })

	render({ shapeColor, coordinates })
}
