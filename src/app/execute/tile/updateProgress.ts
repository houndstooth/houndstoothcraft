import { from } from '../../../utilities'
import { appState } from '../../appState'
import { UpdateProgressParams } from './types'

const ONE_HUNDRED_PERCENT: number = 100

const updateProgress: () => void =
	(): void => {
		const percentage: number = calculatePercentage()
		const currentLayerValue: number = from.Layer(appState.execute.currentLayer)
		const endLayerValue: number = from.Layer(appState.controls.endLayer)

		updateProgressBar({ percentage })
		updateLayersProgressBar({ percentage, currentLayerValue, endLayerValue })
		updateProgressMessage({ percentage, currentLayerValue, endLayerValue })

		maybeResolveGrid()
	}

const calculatePercentage: () => number =
	(): number =>
		Math.ceil(appState.execute.tilesCompleted * ONE_HUNDRED_PERCENT / appState.execute.tileCount)

const updateProgressBar: (_: { percentage: number }) => void =
	({ percentage }: { percentage: number }): void => {
		appState.dom.progressBar.style.width = `${percentage}%`
	}

const updateLayersProgressBar: (_: UpdateProgressParams) => void =
	({ currentLayerValue, endLayerValue, percentage }: UpdateProgressParams): void => {
		const layerCount: number = endLayerValue + 1
		const layersPercentage: number = (percentage + currentLayerValue * ONE_HUNDRED_PERCENT) / layerCount
		appState.dom.layersProgressBar.style.width = `${layersPercentage}%`
	}

const updateProgressMessage: (_: UpdateProgressParams) => void =
	({ currentLayerValue, endLayerValue, percentage }: UpdateProgressParams): void => {
		const animationsAndLayersMessages: string[] = []
		if (appState.controls.animating) {
			animationsAndLayersMessages.push(` frame ${appState.controls.currentFrame}`)
		}
		if (endLayerValue) {
			animationsAndLayersMessages.push(` layer ${currentLayerValue}/${endLayerValue}`)
		}
		appState.dom.progressMessage.textContent = `Rendering${animationsAndLayersMessages.join(',')}: ${percentage}%`
	}

const maybeResolveGrid: () => void =
	(): void => {
		if (appState.execute.tilesCompleted === appState.execute.tileCount) {
			appState.execute.resolveGrid()
			appState.dom.progressBar.style.width = '0%'
			appState.dom.progressMessage.textContent = ''
			appState.execute.tilesCompleted = 0
		}
	}

export default updateProgress
