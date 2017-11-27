// tslint:disable:no-any

import { SettingsPath } from './types'

const buildSettingsNamesToPathsMap: <T>(_: { basePath: SettingsPath, settings: T }) => T =
	<T>({ basePath, settings }: { basePath: SettingsPath, settings: any }): any =>
		// tslint:disable:no-unsafe-any
		Object.keys(settings).reduce(
			(o: object, key: string): any => ({ ...o, [ key ]: basePath }),
			{},
		) as T

export default buildSettingsNamesToPathsMap
