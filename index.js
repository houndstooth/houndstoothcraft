import state from './state'
import canvas from './shared/render/canvas'
import defaultState from './defaultState'
import overrideState from './overrideState'
import clear from './shared/render/clear'
import prepareAnimations from './animation/prepare'
import animate from './animation/animate'
import animation from './animation/animation'
import iterate from './iteration/iterate'
import iteration from './iteration/iteration'
import prepareIterations from './iteration/prepare'
// import cmyktooth from './cmyktooth/cmyktooth'
import houndsmorphosis from './houndsmorphosis/houndsmorphosis'
// import standard from './standard/standard'
// import houndazzle from './houndazzle/houndazzle'

const pattern = houndsmorphosis


Object.keys(defaultState).forEach(key => {
	state[ key ] = Object.assign({}, defaultState[ key ])
})

const prepareState = ({ stateOverridesObject, nestedPropertyPath }) => {
	Object.entries(stateOverridesObject).forEach(([ propertyName, stateOverrideProperty ]) => {
		if (typeof stateOverrideProperty === 'object') {
			const deeperPath = nestedPropertyPath.slice()
			deeperPath.push(propertyName)
			prepareState({ stateOverridesObject: stateOverrideProperty, nestedPropertyPath: deeperPath })
		} else  {
			let stateObjectWithPropertyNeedingToBeOverridden = state
			nestedPropertyPath.forEach(pathStep => {
				stateObjectWithPropertyNeedingToBeOverridden = stateObjectWithPropertyNeedingToBeOverridden[pathStep]
			})
			stateObjectWithPropertyNeedingToBeOverridden[propertyName] = stateOverrideProperty
		}
	})
}

prepareState({stateOverridesObject: overrideState, nestedPropertyPath: []})

console.log(state)

const canvasSize = state.shared.canvasSize
canvas.width = canvasSize
canvas.height = canvasSize

const { animating, frameRate, refreshCanvas } = state.animation

let iterations = prepareIterations({ iterationObject: iteration, nestedPropertyPath: [], iterations: [] })

if (animating) {
	let animations = prepareAnimations({ animationObject: animation, nestedPropertyPath: [], animations: [] })
	setInterval(() => {
		if (refreshCanvas) clear()

		if (state.iteration.iterating) {
			const preIterationState = Object.assign({}, state)

			for (let n = 0; n <= state.iteration.endIteration; n++) {
				if (n >= state.iteration.startIteration) {
					pattern()
				}
				iterate({ iterations })
			}

			Object.keys(state).forEach(key => {
				state[ key ] = Object.assign({}, preIterationState[ key ])
			})
		} else {
			pattern()
		}

		animate({ animations })
	}, frameRate)
} else {
	if (state.iteration.iterating) {
		for (let n = 0; n <= state.iteration.endIteration; n++) {
			if (n >= state.iteration.startIteration) {
				pattern()
			}
			iterate({ iterations })
		}
	} else {
		// console.time('pattern');
		pattern()
		// console.timeEnd('pattern');
	}
}