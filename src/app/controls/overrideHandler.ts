import { from, to } from '../../utilities'
import { appState } from '../appState'
import { executeSelectedEffects } from '../execute'
import { clearMixedDownContext } from '../render'
import { getPatternSettingOrCreatePath, SettingStep } from '../settings'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'

const overrideHandler: (_: Event) => void =
	(event: Event): void => {
		updateCorrespondingOverride(event)
		clearMixedDownContext.default()
		executeSelectedEffects.default()
		enableOrDisableAnimationControls()
	}

const updateCorrespondingOverride: (_: Event) => void =
	(event: Event): void => {
		const input: HTMLInputElement = event.target as HTMLInputElement

		const fullSettingPathStrings: string[] = input.id.split('-')
		const settingName: SettingStep = to.SettingStep(fullSettingPathStrings.splice(-1)[ 0 ])
		// tslint:disable-next-line:no-any
		const settingParent: any = getPatternSettingOrCreatePath.default({
			pattern: appState.settings.overrides,
			settingPath: to.SettingPath(fullSettingPathStrings),
		})
		let value: string | undefined
		try {
			value = JSON.parse(input.value) as string
		}
		catch {
			try {
				// tslint:disable-next-line:no-eval no-unsafe-any
				value = eval(`(${input.value})`)
			}
			catch {
				value = undefined
			}
		}
		// tslint:disable-next-line:no-unsafe-any
		settingParent[ from.SettingStep(settingName) ] = value
	}

export default overrideHandler
