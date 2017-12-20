import { AppendOverrideParams } from './types'

const appendOverride: (_: AppendOverrideParams) => void =
	({ options, override, settingPath }: AppendOverrideParams): void => {
		if (settingPath.length === options.grandparents.length) {
			options.grandparents.push(options.parent)
		}
		else if (settingPath.length < options.grandparents.length) {
			options.grandparents = options.grandparents.slice(0, settingPath.length + 1)
			options.parent = options.grandparents[ settingPath.length ]
		}
		else {
			throw new Error('how did you skip a parent?')
		}

		options.parent.appendChild(override)
		options.parent = override
	}

export default appendOverride
