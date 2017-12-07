// tslint:disable:no-any

import { appState } from '../appState'
import { SettingsPath } from './types'

const getSettingsPath: (_: { settingName: any }) => SettingsPath =
	({ settingName }: { settingName: any }): SettingsPath =>
		appState.settings.settingNamesToPathsMap[ settingName ]

export default getSettingsPath
