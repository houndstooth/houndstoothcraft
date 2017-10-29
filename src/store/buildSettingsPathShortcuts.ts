// tslint:disable:no-any

import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { SettingsPath } from './types'

const buildSettingsPathShortcuts: <T>(_: { basePath: SettingsPath, settings: T }) => T =
	<T>({ basePath, settings }: { basePath: SettingsPath, settings: T }): T =>
		Object.keys(settings).reduce(
			(o: object, key: string): any => ({
				...o,
				[key]: to.SettingsPath(from.SettingsPath(basePath).concat([ key ])),
			}),
			{},
		)

export { buildSettingsPathShortcuts }
