import { getSetting } from '../../app'
import { ONE_HUNDRED_PERCENT } from '../../constants'
import * as from from '../../from'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'

const updateProgress: NullarySideEffector =
	(): void => {
		const percentage: number = Math.ceil(state.execute.tilesCompleted * ONE_HUNDRED_PERCENT / (state.execute.tileCount))

		state.dom.progressBar.style.width = `${percentage}%`

		const endLayerValue: number = from.Layer(getSetting.default('endLayer'))
		const currentLayerValue: number = from.Layer(state.execute.currentLayer)

		const layerCount: number = endLayerValue + 1
		const layersPercentage: number = (percentage + currentLayerValue * ONE_HUNDRED_PERCENT) / layerCount
		state.dom.layersProgressBar.style.width = `${layersPercentage}%`

		const animationsAndLayersMessages: string[] = []
		if (state.controls.animating) {
			animationsAndLayersMessages.push(` frame ${state.controls.currentFrame}`)
		}
		if (endLayerValue) {
			animationsAndLayersMessages.push(` layer ${currentLayerValue}/${endLayerValue}`)
		}
		state.dom.progressMessage.textContent = `Rendering${animationsAndLayersMessages.join(',')}: ${percentage}%`
	}

export default updateProgress
