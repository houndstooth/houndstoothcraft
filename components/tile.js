import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import tileToStandardShapes from './tileToStandardShapes'
import transpositionUtilities from '../utilities/transpositionUtilities'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const { tileOrigin, sizedUnit } = transpositionUtilities.getTileOriginAndSizedUnit({ address })
	if (!tileOrigin) return

	const tileToShapes = state.tileConfig.tileToShapes || tileToStandardShapes

	tileToShapes({ address, tileColors, tileOrigin, sizedUnit })
}
