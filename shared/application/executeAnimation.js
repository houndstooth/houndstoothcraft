import animations from './animations'
import prepareFunctionsPerStateProperty from './prepareFunctionsPerStateProperty'
import callFunctionsPerStateProperty from './callFunctionsPerStateProperty'

import executeIteration from './executeIteration'

import clear from '../render/clear'

import state from './state'
import resetState from './resetState'


export default ({ pattern, iterations }) => {
	const { frameRate, refreshCanvas } = state.animation

	setInterval(() => {
		if (refreshCanvas) clear()

		if (state.iteration.iterating) {
			const preIterationState = Object.assign({}, state)
			executeIteration({ pattern, iterations })
			resetState({ objectToResetStateTo: preIterationState })
		} else {
			pattern()
		}

		callFunctionsPerStateProperty({
			functionObjects: prepareFunctionsPerStateProperty({ objectWithFunctions: animations })
		})
	}, frameRate)
}