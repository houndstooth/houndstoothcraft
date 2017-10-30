// tslint:disable:no-any

import { SettingsPath } from './types'

const buildSettingsNamesToPathsMap: (_: { basePath: SettingsPath, settings: any }) => any =
	({ basePath, settings }: { basePath: SettingsPath, settings: any }): any =>
		Object.keys(settings).reduce(
			(o: object, key: string): any => ({ ...o, [ key ]: basePath }),
			{},
		)

export { buildSettingsNamesToPathsMap }
