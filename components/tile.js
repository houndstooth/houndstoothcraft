import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import standardShapes from './standardShapes'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const shapes = state.shapes || standardShapes

	shapes({ address, tileColors })
}
