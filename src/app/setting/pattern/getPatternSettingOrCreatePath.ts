// tslint:disable:no-any no-unsafe-any

import { codeUtilities } from '../../../utilities'
import { SettingPath, SettingStep } from '../types'

const getPatternSettingOrCreatePath: (_: { pattern: any, settingPath: SettingPath }) => any =
	({ pattern, settingPath }: { pattern: any, settingPath: SettingPath }): any => {
		let children: any = pattern
		settingPath.forEach((settingStep: SettingStep): void => {
			if (!codeUtilities.isDefined(children[ settingStep ])) {
				children[ settingStep ] = {}
			}
			children = children[ settingStep ]
		})

		return children
	}

export default getPatternSettingOrCreatePath
