import { AppendOverrideNodeParams } from './types'

const appendOverrideNode: (_: AppendOverrideNodeParams) => void =
	({ options, overrideNode, settingPath }: AppendOverrideNodeParams): void => {
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

		options.parent.appendChild(overrideNode)
		options.parent = overrideNode
	}

export default appendOverrideNode
