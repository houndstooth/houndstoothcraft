import state from './state'
import clear from './shared/render/clear'
import prepare from './animation/prepare'
import animate from './animation/animate'
import animation from './animation/animation'

import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
import standard from './standard/standard'
import ginghamChevronContinuumOptimizedForAnimation from './gingham-chevron-continuum-animated/ginghamChevronContinuumOptimizedForAnimation'
import houndazzle from './houndazzle/houndazzle'

const pattern = cmyktooth

const { animating, frameRate, refreshCanvas } = state.animation

if (animating) {
    let animations = prepare({ animationObject: animation, nestedPropertyPath: [], animations: [] })
    setInterval(() => {
        if (refreshCanvas) clear()
        pattern()
        animate({ animations })
    }, frameRate)
} else {
    pattern()
}