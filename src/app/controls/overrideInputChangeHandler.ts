// tslint:disable:no-any

import { Pattern } from '../../types'
import { from } from '../../utilities'
import { appState } from '../appState'
import { parseOverrideId } from '../dom'
import { executeSelectedEffects } from '../execute'
import { clearMixedDownContext } from '../render'
import { FullSettingPath, getPatternSettingOrCreatePath, SettingStep } from '../settings'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'

const overrideInputChangeHandler: (_: Event) => void =
	(event: Event): void => {
		updateCorrespondingOverride(event)
		clearMixedDownContext.default()
		executeSelectedEffects.default()
		enableOrDisableAnimationControls()
	}

const updateCorrespondingOverride: (_: Event) => void =
	(event: Event): void => {
		const input: HTMLInputElement = event.target as HTMLInputElement
		const { patternName, settingName, settingPath }: FullSettingPath = parseOverrideId.default(input.id)
		const pattern: Pattern = getOverridePatternOrCreatePath(patternName)
		const settingParent: any = getPatternSettingOrCreatePath.default({ pattern, settingPath })
		// tslint:disable-next-line:no-unsafe-any
		settingParent[ from.SettingStep(settingName) ] = parseOverrideInputValue(input.value)
	}

const getOverridePatternOrCreatePath: (_: SettingStep) => Pattern =
	(patternName: SettingStep): Pattern => {
		const patternNameString: string = from.SettingStep(patternName)
		if (!appState.settings.overrides[ patternNameString ]) {
			appState.settings.overrides[ patternNameString ] = {}
		}

		return appState.settings.overrides[ patternNameString ] as Pattern
	}

const parseOverrideInputValue: (_: string) => any =
	(inputValue: string): any => {
		let value: any
		try {
			value = JSON.parse(inputValue)
		}
		catch (_) {
			try {
				// tslint:disable-next-line:no-eval no-unsafe-any
				value = eval(`(${inputValue})`)
			}
			catch (_) {
				value = undefined
			}
		}

		return value
	}

export default overrideInputChangeHandler
