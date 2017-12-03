// tslint:disable:no-unsafe-any max-line-length

import { getSetting } from '../../app'
import { ONE_HUNDRED_PERCENT } from '../../constants'
import * as from from '../../from'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'

const updateProgress: NullarySideEffector =
	(): void => {
		const percentage: number = Math.ceil(state.tilesCompleted * ONE_HUNDRED_PERCENT / (state.tileCount))

		const progressBar: HTMLElement = documentWrapper.querySelector('#progress-bar') as HTMLElement
		/* istanbul ignore else */
		if (progressBar) {
			progressBar.style.width = `${percentage}%`
		}

		const endLayerValue: number = from.Layer(getSetting.default('endLayer'))
		const currentLayerValue: number = from.Layer(state.currentLayer)

		const layersProgressBar: HTMLElement = documentWrapper.querySelector('#layers-progress-bar') as HTMLElement
		/* istanbul ignore else */
		if (progressBar) {
			const layerCount: number = endLayerValue + 1
			const layersPercentage: number = (percentage + currentLayerValue * ONE_HUNDRED_PERCENT) / layerCount
			layersProgressBar.style.width = `${layersPercentage}%`
		}

		const progressMessage: HTMLElement = documentWrapper.querySelector('#progress-message') as HTMLElement
		/* istanbul ignore else */
		if (progressMessage) {
			const animationsAndLayersMessages: string[] = []
			if (state.animating) {
				animationsAndLayersMessages.push(` frame ${state.currentFrame}`)
			}
			if (endLayerValue) {
				animationsAndLayersMessages.push(` layer ${currentLayerValue}/${endLayerValue}`)
			}
			progressMessage.textContent = `Rendering${animationsAndLayersMessages.join(',')}: ${percentage}%`
		}
	}

export default updateProgress
