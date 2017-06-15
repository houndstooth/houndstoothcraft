import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import tileToStandardShapes from './tileToStandardShapes'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const tileToShapes = state.tileConfig.tileToShapes || tileToStandardShapes

	tileToShapes({ address, tileColors })
}
