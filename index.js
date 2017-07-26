import composeMainHoundstooth from './src/store/composeMainHoundstooth'
import setupCanvas from './src/render/setupCanvas'
import execute from './src/application/execute'

// import cmyktoothEffect from './effects/cmyktooth/effects/cmyktoothEffect'
// import ginghamChevronContinuumEffect from './effects/gingham-chevron-continuum/effects/ginghamChevronContinuumEffect'
// import harmonitoothEffect from './effects/harmonitooth/effects/harmonitoothEffect'
// import houndazzleEffect from './effects/houndazzle/effects/houndazzleEffect'
// import houndazzleContinuumEffect from './effects/houndazzle/effects/houndazzleContinuumEffect'
// import gongramEffect from './effects/gongram/effects/gongramEffect'
// import houndsmorphosisEffect from './effects/houndsmorphosis/effects/houndsmorphosisEffect'

composeMainHoundstooth({
	houndstoothEffects: [],
	houndstoothOverrides: {},
	logComposedMainHoundstooth: false,
})

setupCanvas()

execute({
	iterating: false,
	animating: false,
	exportFrames: false,
	performanceLogging: false,
})
