// tslint:disable:no-any

import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { SettingsPath } from './types'

const buildSettingsPathShortcuts: (_: { basePath: SettingsPath, settings: any }) => any =
	({ basePath, settings }: { basePath: SettingsPath, settings: any }): any =>
		Object.keys(settings).reduce(
			(o: any, key: string): any => ({
				...o,
				[key]: to.SettingsPath(from.SettingsPath(basePath).concat([ key ])),
			}),
			{},
		)

export { buildSettingsPathShortcuts }
