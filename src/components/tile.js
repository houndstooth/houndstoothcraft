import colorUtilities from '../utilities/colorUtilities'
import shape from './shape'
import transpositionUtilities from '../utilities/transpositionUtilities'
import gatherOptions from '../settings/gatherOptions'
import stripeUtilities from '../utilities/stripeUtilities'
import squareCoordinates from '../shapes/squareCoordinates'
import stripeCoordinates from '../shapes/stripeCoordinates'
import { PERIMETER_SCALAR } from '../constants'

export default ({ address }) => {
	const { tileOrigin, sizedUnit } = transpositionUtilities.getTileOriginAndSizedUnit({ address })
	if (!tileOrigin) return

	const tileColors = colorUtilities.getColorsForTile({ address })

	let { tileToShapes, getCoordinates, isTileUniform, collapseSameColoredShapesWithinTile } = settings.initial.tileConfig || {}
	collapseSameColoredShapesWithinTile = typeof collapseSameColoredShapesWithinTile === 'undefined' ? true : collapseSameColoredShapesWithinTile

	tileToShapes = tileToShapes || shape
	const getCoordinatesHere = {}
	getCoordinatesHere.whenTileIsUniform = getCoordinates && getCoordinates.whenTileIsUniform || squareCoordinates
	getCoordinatesHere.whenTileIsMultiform = getCoordinates && getCoordinates.whenTileIsMultiform || stripeCoordinates

	const gatherOptionsHere = settings.initial.gatherOptions || gatherOptions
	const options = gatherOptionsHere({ address })

	if (collapseSameColoredShapesWithinTile) {
		isTileUniform = isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform({ tileColors, options })) {
			tileToShapes({
				getCoordinates: getCoordinatesHere.whenTileIsUniform,
				address,
				tileColors,
				tileOrigin,
				sizedUnit,
				options,
			})
			return
		}
	}

	const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address })
	stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
		tileToShapes({
			getCoordinates: getCoordinatesHere.whenTileIsMultiform,
			address,
			tileColors,
			tileOrigin,
			sizedUnit,
			options,
			colorsIndex: stripeIndex,
			stripeIndex,
			stripeCount: stripePositionsForTile.length,
			coordinatesOptions: { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || PERIMETER_SCALAR }
		})
	})
}
