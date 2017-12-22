import { ObjectOf, to } from '../../../utilities'
import { appState } from '../../appState'
import { parseOverrideId } from '../../dom'
import { executeEffect } from '../../execute'
import { clearMixedDownContext } from '../../render'
import { FullSettingPath, getEffectSetting } from '../../setting'
import { enableOrDisableAnimationControls } from '../animation'

const overrideClearHandler: (_: Event) => void =
	(event: Event): void => {
		event.stopPropagation()
		const overrideClear: HTMLButtonElement = event.target as HTMLButtonElement
		const parentElementOfClearWithId: HTMLElement = overrideClear.parentNode as HTMLElement

		const {
			patternName,
			settingName,
			settingPath,
		}: FullSettingPath = parseOverrideId.default(parentElementOfClearWithId.id)

		// tslint:disable-next-line:no-any no-unsafe-any
		const parentSettingOfOverrideToClear: ObjectOf<any> = getEffectSetting.default({
			concatenatedFullSettingPath: to.SettingPath([ patternName ].concat(settingPath)),
			effect: appState.settings.overrides,
		})

		delete parentSettingOfOverrideToClear[ settingName ]

		clearMixedDownContext.default()
		executeEffect.default()
		enableOrDisableAnimationControls.default()
	}

export default overrideClearHandler
