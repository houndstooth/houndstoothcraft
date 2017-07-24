import colorUtilities from '../utilities/colorUtilities'
import codeUtilities from '../utilities/codeUtilities'
import shape from './shape'
import componentUtilities from '../utilities/componentUtilities'
import gatherOptions from '../application/gatherOptions'
import stripeUtilities from '../utilities/stripeUtilities'
import squareCoordinates from '../shapes/squareCoordinates'
import stripeCoordinates from '../shapes/stripeCoordinates'
import { PERIMETER_SCALAR } from '../constants'
import store from '../../store'

export default ({ gridAddress }) => {
	const { tileOrigin, tileSize } = componentUtilities.getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) return

	const tileColors = colorUtilities.getColorsForTile({ gridAddress })

	let { tileToShapes, getCoordinates, isTileUniform, collapseSameColoredShapesWithinTile } = store.currentState.mainHoundstooth.basePattern.tileSettings || {}
	collapseSameColoredShapesWithinTile = codeUtilities.defaultToTrue(collapseSameColoredShapesWithinTile)

	tileToShapes = tileToShapes || shape
	const getCoordinatesHere = {}
	getCoordinatesHere.whenTileIsUniform = getCoordinates && getCoordinates.whenTileIsUniform || squareCoordinates
	getCoordinatesHere.whenTileIsMultiform = getCoordinates && getCoordinates.whenTileIsMultiform || stripeCoordinates

	const options = gatherOptions({ gridAddress })

	if (collapseSameColoredShapesWithinTile) {
		isTileUniform = isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform({ tileColors, options })) {
			tileToShapes({
				getCoordinates: getCoordinatesHere.whenTileIsUniform,
				gridAddress,
				tileColors,
				tileOrigin,
				tileSize,
				options,
			})
			return
		}
	}

	const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ gridAddress })
	stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
		tileToShapes({
			getCoordinates: getCoordinatesHere.whenTileIsMultiform,
			gridAddress,
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
