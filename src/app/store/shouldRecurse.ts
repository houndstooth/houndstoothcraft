// tslint:disable:no-any

import { Color } from '../../pattern'
import { codeUtilities } from '../../utilities'

const shouldRecurse: (setting: any) => boolean =
	(setting: any): boolean =>
		settingIsNonArrayObject(setting) && settingIsNotColor(setting)

const settingIsNonArrayObject: (setting: any) => boolean =
	(setting: any): boolean => {
		if (!setting) {
			return false
		}
		if (typeof setting !== 'object') {
			return false
		}

		return !(setting instanceof Array)
	}

const settingIsNotColor: (setting: any) => boolean =
	(setting: any): boolean => {
		// tslint:disable-next-line:no-unsafe-any
		const { r, g, b, a }: Color = setting

		// tslint:disable-next-line:max-line-length
		return !(codeUtilities.isDefined(r) || codeUtilities.isDefined(g) || codeUtilities.isDefined(b) || codeUtilities.isDefined(a))
	}

export default shouldRecurse
