// tslint:disable:no-any no-unsafe-any

import { isDefined } from '../utilities/codeUtilities'
import { SettingsPath, SettingsStep } from './types'

const getSettingOrCreatePath: (_: { settings: any, settingsPath: SettingsPath }) => any =
	({ settings, settingsPath }: { settings: any, settingsPath: SettingsPath }): any => {
		let childSettings: any = settings
		settingsPath.forEach((settingsStep: SettingsStep): void => {
			if (!isDefined(childSettings[ settingsStep ])) {
				childSettings[ settingsStep ] = {}
			}
			childSettings = childSettings[ settingsStep ]
		})

		return childSettings
	}

export { getSettingOrCreatePath }
