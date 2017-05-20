import state from './state'
import animation from './animation'

import cmyktooth from './cmyktooth/index'
import houndsmorphosis from './houndsmorphosis/index'
import standard from './standard/index'
import ginghamChevronContinuum from './gingham-chevron-continuum/index'
import ginghamChevronContinuumStripesDrawnAcrossEntireGridInsteadOfByIndividualTileToBeOptimizedForAnimation from './gingham-chevron-continuum-animated/index'
import houndazzle from './houndazzle/index'

const pattern = standard

if (state.shared.animating) {
    setInterval(() => {
        pattern()

        //then, for each thing in state, call its animation function
        //this is just a proof of concept
        state.shared.stripeCount = animation.shared.stripeCount(state.shared.stripeCount)
        // state.ginghamChevronContinuumAnimated.thinningRate = animation.ginghamChevronContinuumAnimated.thinningRate(state.ginghamChevronContinuumAnimated.thinningRate)

    }, state.shared.frameRate)
} else {
    pattern()
}
