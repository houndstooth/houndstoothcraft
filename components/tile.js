import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import shape from './shape'
import transpositionUtilities from '../utilities/transpositionUtilities'
import gatherOptions from '../state/gatherOptions'
import stripeUtilities from '../utilities/stripeUtilities'
import squareCoordinates from '../shapes/squareCoordinates'
import stripeCoordinates from '../shapes/stripeCoordinates'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const { tileOrigin, sizedUnit } = transpositionUtilities.getTileOriginAndSizedUnit({ address })
	if (!tileOrigin) return

	const tileToShapes = state.tileConfig.tileToShapes || shape
	const getCoordinates = {}
	getCoordinates.whenTileIsUniform = state.tileConfig.getCoordinates.whenTileIsUniform || squareCoordinates
	getCoordinates.whenTileIsMultiform = state.tileConfig.getCoordinates.whenTileIsMultiform || stripeCoordinates

	const options = state.gatherOptions && gatherOptions({ address })

	if (state.tileConfig.collapseSameColoredShapesWithinTile) {
		const isTileUniform = state.tileConfig.isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform({ tileColors, options })) {
			tileToShapes({
				getCoordinates: getCoordinates.whenTileIsUniform,
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
			getCoordinates: getCoordinates.whenTileIsMultiform,
			address,
			tileColors,
			tileOrigin,
			sizedUnit,
			options,
			colorsIndex: stripeIndex,
			stripeIndex,
			stripeCount: stripePositionsForTile.length,
			coordinatesOptions: { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
		})
	})
}
