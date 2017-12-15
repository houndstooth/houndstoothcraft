// tslint:disable:no-any no-unsafe-any

import { codeUtilities } from '../../utilities'
import { SettingPath, SettingStep } from './types'

const getPatternSettingOrCreatePath: (_: { pattern: any, settingPath: SettingPath }) => any =
	({ pattern, settingPath }: { pattern: any, settingPath: SettingPath }): any => {
		let childSettings: any = pattern
		settingPath.forEach((settingStep: SettingStep): void => {
			if (!codeUtilities.isDefined(childSettings[ settingStep ])) {
				childSettings[ settingStep ] = {}
			}
			childSettings = childSettings[ settingStep ]
		})

		return childSettings
	}

export default getPatternSettingOrCreatePath
