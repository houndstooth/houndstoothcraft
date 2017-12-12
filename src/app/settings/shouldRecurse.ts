// tslint:disable:no-any

import { Color } from '../../types'
import { codeUtilities } from '../../utilities'

const shouldRecurse: (_: any) => boolean =
	(setting: any): boolean =>
		settingIsNonArrayObject(setting) && settingIsNotColor(setting)

const settingIsNonArrayObject: (_: any) => boolean =
	(setting: any): boolean => {
		if (!setting) {
			return false
		}
		if (typeof setting !== 'object') {
			return false
		}

		return !(setting instanceof Array)
	}

const settingIsNotColor: (_: any) => boolean =
	(setting: any): boolean => {
		// tslint:disable-next-line:no-unsafe-any
		const { r, g, b, a }: Color = setting

		// tslint:disable-next-line:max-line-length
		return !(codeUtilities.isDefined(r) || codeUtilities.isDefined(g) || codeUtilities.isDefined(b) || codeUtilities.isDefined(a))
	}

export default shouldRecurse
