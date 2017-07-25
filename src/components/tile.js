import colorUtilities from '../utilities/colorUtilities'
import codeUtilities from '../utilities/codeUtilities'
import shape from './shape'
import componentUtilities from '../utilities/componentUtilities'
import gatherOptions from '../application/gatherOptions'
import stripeUtilities from '../utilities/stripeUtilities'
import squareOutline from '../outlines/squareOutline'
import stripeOutline from '../outlines/stripeOutline'
import { PERIMETER_SCALAR } from '../constants'
import store from '../../store'

export default ({ gridAddress }) => {
	const { tileOrigin, tileSize } = componentUtilities.getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) return

	const tileColors = colorUtilities.getColorsForTile({ gridAddress })

	let { tileToShapes, getOutline, isTileUniform, collapseSameColoredShapesWithinTile } = store.currentState.mainHoundstooth.basePattern.tileSettings || {}
	collapseSameColoredShapesWithinTile = codeUtilities.defaultToTrue(collapseSameColoredShapesWithinTile)

	tileToShapes = tileToShapes || shape
	const getOutlineHere = {}
	getOutlineHere.whenTileIsUniform = getOutline && getOutline.whenTileIsUniform || squareOutline
	getOutlineHere.whenTileIsMultiform = getOutline && getOutline.whenTileIsMultiform || stripeOutline

	const options = gatherOptions({ gridAddress })

	if (collapseSameColoredShapesWithinTile) {
		isTileUniform = isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform({ tileColors, options })) {
			tileToShapes({
				getOutline: getOutlineHere.whenTileIsUniform,
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
			getOutline: getOutlineHere.whenTileIsMultiform,
			gridAddress,
			tileColors,
			tileOrigin,
			tileSize,
			options,
			colorsIndex: stripeIndex,
			stripeIndex,
			stripeCount: stripePositionsForTile.length,
			outlineOptions: {
				stripeStart,
				stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || PERIMETER_SCALAR,
			},
		})
	})
}
