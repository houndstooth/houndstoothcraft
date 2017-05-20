import state from './state'
import animation from './animation'
import ctx from './shared/render/ctx'

import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
import standard from './standard/standard'
import ginghamChevronContinuum from './gingham-chevron-continuum/ginghamChevronContinuum'
import ginghamChevronContinuumOptimizedForAnimation from './gingham-chevron-continuum-animated/ginghamChevronContinuumOptimizedForAnimation'
import houndazzle from './houndazzle/houndazzle'

const pattern = houndsmorphosis

if (state.shared.animating) {
    setInterval(() => {
        ctx.clearRect(0, 0, state.shared.canvasSize, state.shared.canvasSize)
        pattern()

        //then, for each thing in state, call its animation function
        //this is just a proof of concept
        state.shared.stripeCount = animation.shared.stripeCount(state.shared.stripeCount)
        // state.shared.gridRotationAboutCenter = animation.shared.gridRotationAboutCenter(state.shared.gridRotationAboutCenter)

        // state.ginghamChevronContinuumAnimated.thinningRate = animation.ginghamChevronContinuumAnimated.thinningRate(state.ginghamChevronContinuumAnimated.thinningRate)

    }, state.shared.frameRate)
} else {
    pattern()
}
