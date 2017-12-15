// tslint:disable:no-any

const formatSetting: (_: any) => string =
	(setting: any): string => {
		if (typeof setting === 'function') {
			// tslint:disable-next-line:no-unsafe-any
			return setting.toString().replace(/\n/g, '').replace(/\t/g, '')
		}
		// tslint:disable-next-line:strict-type-predicates
		else if (typeof setting === 'string') {
			return setting
		}

		return JSON.stringify(setting)
	}

export default formatSetting
