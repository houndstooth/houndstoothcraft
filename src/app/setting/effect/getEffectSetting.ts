// tslint:disable:no-any

import { Effect } from '../../../types'
import { codeUtilities, from } from '../../../utilities'
import { SettingPath, SettingStep } from '../types'
import { GetEffectSetting } from './types'

const getEffectSetting: GetEffectSetting =
	({ concatenatedFullSettingPath, effect }: { concatenatedFullSettingPath: SettingPath, effect: Effect }): any => {
		let setting: any = effect
		concatenatedFullSettingPath.forEach((settingStep: SettingStep): void => {
			const settingStepString: string = from.SettingStep(settingStep)
			// tslint:disable-next-line:no-unsafe-any
			setting = codeUtilities.hasChild(setting, settingStepString) ? setting[ settingStepString ] : undefined
		})

		return setting
	}

export default getEffectSetting
