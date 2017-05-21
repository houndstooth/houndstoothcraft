import state from './state'
import clear from './shared/render/clear'
import prepareAnimations from './animation/prepare'
import animate from './animation/animate'
import animation from './animation/animation'
import iterate from './iteration/iterate'
import iteration from './iteration/iteration'
import prepareIterations from './iteration/prepare'

import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
import standard from './standard/standard'
import houndazzle from './houndazzle/houndazzle'

const pattern = standard

const { animating, frameRate, refreshCanvas } = state.animation

let iterations = prepareIterations({ iterationObject: iteration, nestedPropertyPath: [], iterations: [] })

if (animating) {
    let animations = prepareAnimations({ animationObject: animation, nestedPropertyPath: [], animations: [] })
    setInterval(() => {
        if (refreshCanvas) clear()

        const preIterationState = Object.assign({}, state)

        for (let n = 0; n <= state.iteration.endIteration; n++) {
            if (n >= state.iteration.startIteration) {
                pattern()
            }
            iterate({ iterations })
        }

        Object.keys(state).forEach(key => {
            state[key] = Object.assign({}, preIterationState[key])
        })

        animate({ animations })
    }, frameRate)
} else {
    // console.time('pattern');
    for (let n = 0; n <= state.iteration.endIteration; n++) {
        if (n >= state.iteration.startIteration) {
            pattern()
        }
        iterate({ iterations })
    }    
    // console.timeEnd('pattern');
}