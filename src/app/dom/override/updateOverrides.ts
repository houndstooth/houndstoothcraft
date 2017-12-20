import { from, globalWrapper, to } from '../../../utilities'
import { appState } from '../../appState'
import { mapOverPattern, SettingStep } from '../../setting'
import createOverrideLeaf from './createOverrideLeaf'
import createOverrideParent from './createOverrideParent'

const updateOverrides: () => void =
	(): void => {
		appState.dom.overrideContainer.innerHTML = ''
		createOverridesForPattern(to.SettingStep('basePattern'))
		createOverridesForPattern(to.SettingStep('animationsPattern'))
		createOverridesForPattern(to.SettingStep('layersPattern'))
	}

const createOverridesForPattern: (_: SettingStep) => void =
	(patternName: SettingStep): void => {
		mapOverPattern.default({
			options: {
				grandparents: [],
				parent: createPatternHeader(patternName),
			},
			patternName,
			perLeaf: createOverrideLeaf,
			perParent: createOverrideParent,
		})
	}

const createPatternHeader: (_: SettingStep) => HTMLElement =
	(patternName: SettingStep): HTMLElement => {
		const patternHeader: HTMLElement = globalWrapper.document.createElement('div')
		patternHeader.innerHTML = from.SettingStep(patternName)

		appState.dom.overrideContainer.appendChild(patternHeader)

		return patternHeader
	}

export default updateOverrides
