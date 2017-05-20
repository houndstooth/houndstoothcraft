import state from './state'
import animation from './animation'
import ctx from './shared/render/ctx'

import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
import standard from './standard/standard'
import ginghamChevronContinuum from './gingham-chevron-continuum/ginghamChevronContinuum'
import ginghamChevronContinuumOptimizedForAnimation from './gingham-chevron-continuum-animated/ginghamChevronContinuumOptimizedForAnimation'
import houndazzle from './houndazzle/houndazzle'

const pattern = standard

if (state.shared.animating) {
    setInterval(() => {
        ctx.clearRect(0, 0, state.shared.canvasSize, state.shared.canvasSize)
        pattern()
        animate({ animationObject: animation, nestedKeyPath: [] })
    }, state.shared.frameRate)
} else {
    pattern()
}


const animate = ({ animationObject, nestedKeyPath }) => {
    Object.entries(animationObject).forEach(([key, value]) => {
        if (typeof value == 'function') {
            let thingToCallItOn = state
            nestedKeyPath.forEach(pathStep => thingToCallItOn = thingToCallItOn[pathStep])
            thingToCallItOn[key] = value(thingToCallItOn[key])
        } else if (value) {
            const deeperPath = nestedKeyPath.slice()
            deeperPath.push(key)
            animate({ animationObject: value, nestedKeyPath: deeperPath })
        }
    })
}
