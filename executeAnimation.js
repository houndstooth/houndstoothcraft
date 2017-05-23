import animate from './animation/animate'
import animation from './animation/animation'
import prepareAnimations from './animation/prepare'

import executeIteration from './executeIteration'

import clear from './shared/render/clear'

import state from './state'
import resetState from './resetState'


export default ({ pattern, iterations }) => {
	const { frameRate, refreshCanvas } = state.animation

	let animations = prepareAnimations({ animationObject: animation, nestedPropertyPath: [], animations: [] })
	setInterval(() => {
		if (refreshCanvas) clear()

		if (state.iteration.iterating) {
			const preIterationState = Object.assign({}, state)
			executeIteration({ pattern, iterations })
			resetState({ objectToResetStateTo: preIterationState})
		} else {
			pattern()
		}

		animate({ animations })
	}, frameRate)
}