import { globalWrapper } from '../../utilities'
import { appState } from '../appState'
import { mapOverPattern } from '../settings'
import createOverrideLeaf from './createOverrideLeaf'
import createOverrideParent from './createOverrideParent'

const updateOverrides: () => void =
	(): void => {
		appState.dom.overridesContainer.innerHTML = ''
		createControlsForPattern('basePattern')
		createControlsForPattern('animationsPattern')
		createControlsForPattern('layersPattern')
	}

const createControlsForPattern: (_: string) => void =
	(patternName: string): void => {
		mapOverPattern.default({
			options: {
				grandparents: [],
				parent: createPatternHeader(patternName),
				patternName,
			},
			perLeaf: createOverrideLeaf,
			perParent: createOverrideParent,
		})
	}

const createPatternHeader: (_: string) => HTMLElement =
	(patternName: string): HTMLElement => {
		const patternHeader: HTMLElement = globalWrapper.document.createElement('div')
		patternHeader.innerHTML = patternName

		appState.dom.overridesContainer.appendChild(patternHeader)

		return patternHeader
	}

export default updateOverrides
