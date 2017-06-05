import state from '../../shared/state/state'
import gridUtilities from '../../shared/utilities/gridUtilities'
import colorUtilities from '../../shared/utilities/colorUtilities'

export default ({ address }) => {
	const { colorConfig, orientationConfig } = state.colorConfig.houndazzle
	const colors = colorUtilities.calculateColors({ address, colorConfig })
	const orientations = gridUtilities.calculateSetForTile({
			address,
			config: orientationConfig,
			gccOn: state.stripeCountConfig.mode === 'GINGHAM_CHEVRON_CONTINUUM'
		})

	return { colors, orientations }
}