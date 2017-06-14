import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import standardTileFunction from './standardTileFunction'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const tileFunction = state.tileFunction || standardTileFunction

	tileFunction({ address, tileColors })
}
