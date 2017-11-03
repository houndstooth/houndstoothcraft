// tslint:disable:no-unsafe-any

import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { document, windowWrapper } from '../utilities/windowWrapper'
import { buildProgressIntervalFunction } from './buildProgressIntervalFunction'

const PROGRESS_UPDATE_RATE: number = 30

const gridComplete: (resolveGrid: NullarySideEffector) => void =
	(resolveGrid: NullarySideEffector): void => {
		const progressBar: HTMLElement | undefined = document.querySelector('.progress-bar') as HTMLElement

		state.progressInterval = windowWrapper.setInterval(
			buildProgressIntervalFunction({ progressBar, resolveGrid }),
			PROGRESS_UPDATE_RATE,
		)
	}

export { gridComplete }
