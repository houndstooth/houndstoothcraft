import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'
import { ExecuteParams } from '../types'

import animation from './animation'

const FRAME_RATE: number = 30

const executeAnimation: (_: ExecuteParams) => Promise<void> =
	async (executeParams: ExecuteParams): Promise<void> => {
		appState.execute.animationInterval = globalWrapper.window.setInterval(
			() => {
				animation(executeParams).then().catch()
			},
			FRAME_RATE,
		)

		// @ts-ignore
		await new Promise<(_: () => void) => void>(storeResolveAnimation)
	}

const storeResolveAnimation: (_: () => void) => void =
	(resolveAnimation: () => void): void => {
		appState.execute.resolveAnimation = resolveAnimation
	}

export default executeAnimation
