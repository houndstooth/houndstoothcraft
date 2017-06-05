import state from '../../shared/state/state'
import mathUtilities from '../../shared/utilities/mathUtilities'

export default () => {
    const { gridSize, stripeCountConfig } = state
    const { initial, delta } = stripeCountConfig.ginghamChevronContinuum
    return initial + delta * mathUtilities.triangularNumber(gridSize)
}
