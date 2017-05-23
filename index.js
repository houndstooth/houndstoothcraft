import state from './shared/application/state'

import setupState from './shared/application/setupState'
import setupCanvas from './shared/render/setupCanvas'

import iterations from './shared/application/iterations'
import prepareFunctionsPerStateProperty from './shared/application/prepareFunctionsPerStateProperty'

import executePattern from './shared/application/executePattern'
import executeAnimation from './shared/application/executeAnimation'

// import standard from './standard/standard'
// import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
// import houndazzle from './houndazzle/houndazzle'

setupState()
setupCanvas()

const execute = state.animation.animating ? executeAnimation : executePattern
execute({
	pattern: houndsmorphosis,
	iterations: prepareFunctionsPerStateProperty({ objectWithFunctions: iterations})
})