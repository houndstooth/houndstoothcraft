import colorUtilities from '../utilities/colorUtilities'
import codeUtilities from '../utilities/codeUtilities'
import shape from './shape'
import componentUtilities from '../utilities/componentUtilities'
import gatherOptions from '../application/gatherOptions'
import stripeUtilities from '../utilities/stripeUtilities'
import squareCoordinates from '../shapes/squareCoordinates'
import stripeCoordinates from '../shapes/stripeCoordinates'
import { PERIMETER_SCALAR } from '../constants'

export default ({ address }) => {
	const { tileOrigin, tileSize } = componentUtilities.getTileOriginAndSize({ address })
	if (!tileOrigin) return

	const tileColors = colorUtilities.getColorsForTile({ address })

	let { tileToShapes, getCoordinates, isTileUniform, collapseSameColoredShapesWithinTile } = currentState.settings.base.tileSettings || {}
	collapseSameColoredShapesWithinTile = codeUtilities.defaultToTrue(collapseSameColoredShapesWithinTile)

	tileToShapes = tileToShapes || shape
	const getCoordinatesHere = {}
	getCoordinatesHere.whenTileIsUniform = getCoordinates && getCoordinates.whenTileIsUniform || squareCoordinates
	getCoordinatesHere.whenTileIsMultiform = getCoordinates && getCoordinates.whenTileIsMultiform || stripeCoordinates

	const options = gatherOptions({ address })

	if (collapseSameColoredShapesWithinTile) {
		isTileUniform = isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform({ tileColors, options })) {
			tileToShapes({
				getCoordinates: getCoordinatesHere.whenTileIsUniform,
				address,
				tileColors,
				tileOrigin,
				tileSize,
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
			tileSize,
			options,
			colorsIndex: stripeIndex,
			stripeIndex,
			stripeCount: stripePositionsForTile.length,
			coordinatesOptions: {
				stripeStart,
				stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || PERIMETER_SCALAR,
			},
		})
	})
}
