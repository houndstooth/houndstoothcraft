import render from '../render/render'
import rotationUtilities from '../utilities/rotationUtilities'
import codeUtilities from '../utilities/codeUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import square from '../shapes/square'
import stripe from '../shapes/stripe'

export default ({ address, tileColors, stripeIndex, getCoordinates, coordinatesOptions }) => {
	const { shapeOrigin, sizedUnit } = transpositionUtilities.getShapeOriginAndSizedUnit({ address })
	if (!shapeOrigin) return

	const shapeColor = codeUtilities.wrappedIndex({ array: tileColors, index: stripeIndex })
	if (shapeColor.a === 0) return

	if (!getCoordinates) getCoordinates = coordinatesOptions ? stripe : square
	let coordinates = getCoordinates({ shapeOrigin, sizedUnit, coordinatesOptions })
	if (!coordinates) return
	coordinates = rotationUtilities.applyRotationToShape({ coordinates, shapeOrigin, sizedUnit })

	render({ shapeColor, coordinates })
}
