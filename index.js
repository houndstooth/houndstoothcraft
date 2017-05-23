import state from './state'

import setupState from './setupState'
import setupCanvas from './shared/render/setupCanvas'

import iteration from './iteration/iteration'
import prepareIterations from './iteration/prepare'

import executePattern from './executePattern'
import executeAnimation from './executeAnimation'

// import standard from './standard/standard'
// import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
// import houndazzle from './houndazzle/houndazzle'

setupState()
setupCanvas()

const execute = state.animation.animating ? executeAnimation : executePattern
execute({
	pattern: houndsmorphosis,
	iterations: prepareIterations({ iterationObject: iteration, nestedPropertyPath: [], iterations: [] })
})