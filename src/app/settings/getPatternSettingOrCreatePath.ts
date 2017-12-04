// tslint:disable:no-any no-unsafe-any

import { codeUtilities } from '../../utilities'
import { SettingsPath, SettingsStep } from './types'

const getPatternSettingOrCreatePath: (_: { pattern: any, settingsPath: SettingsPath }) => any =
	({ pattern, settingsPath }: { pattern: any, settingsPath: SettingsPath }): any => {
		let childSettings: any = pattern
		settingsPath.forEach((settingsStep: SettingsStep): void => {
			if (!codeUtilities.isDefined(childSettings[ settingsStep ])) {
				childSettings[ settingsStep ] = {}
			}
			childSettings = childSettings[ settingsStep ]
		})

		return childSettings
	}

export default getPatternSettingOrCreatePath
