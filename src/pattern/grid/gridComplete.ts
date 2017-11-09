// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { documentWrapper, windowWrapper } from '../../utilities'
import { buildGridProgressIntervalFunction } from './buildGridProgressIntervalFunction'

const PROGRESS_UPDATE_RATE: number = 30

const gridComplete: (resolveGrid: NullarySideEffector) => void =
	(resolveGrid: NullarySideEffector): void => {
		const progressBar: HTMLElement | undefined = documentWrapper.querySelector('#progress-bar') as HTMLElement

		state.resolveGrid = resolveGrid
		state.gridProgressInterval = windowWrapper.setInterval(
			buildGridProgressIntervalFunction({ progressBar }),
			PROGRESS_UPDATE_RATE,
		)
	}

export { gridComplete }
