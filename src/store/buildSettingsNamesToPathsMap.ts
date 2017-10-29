// tslint:disable:no-any

import { SettingsPath } from './types'

const buildSettingsNamesToPathsMap: <T>(_: { basePath: SettingsPath, settings: T }) => T =
	<T>({ basePath, settings }: { basePath: SettingsPath, settings: T }): T =>
		Object.keys(settings).reduce(
			(o: object, key: string): any => ({ ...o, [ key ]: basePath }),
			{},
		)

export { buildSettingsNamesToPathsMap }
