import state from './state'
import animation from './animation'

import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
import standard from './standard/standard'
import ginghamChevronContinuum from './gingham-chevron-continuum/ginghamChevronContinuum'
import ginghamChevronContinuumOptimizedForAnimation from './gingham-chevron-continuum-animated/ginghamChevronContinuumOptimizedForAnimation'
import houndazzle from './houndazzle/houndazzle'

const pattern = cmyktooth

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
