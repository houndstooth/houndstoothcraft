import { AppendOverrideNodeParams } from './types'

const appendOverrideNode: (_: AppendOverrideNodeParams) => void =
	({ options, overrideNode, settingsPath }: AppendOverrideNodeParams): void => {
		if (settingsPath.length === options.grandparents.length) {
			options.grandparents.push(options.parent)
		}
		else if (settingsPath.length < options.grandparents.length) {
			options.grandparents = options.grandparents.slice(0, settingsPath.length + 1)
			options.parent = options.grandparents[ settingsPath.length ]
		}
		else {
			throw new Error('how did you skip a parent?')
		}

		options.parent.appendChild(overrideNode)
		options.parent = overrideNode
	}

export default appendOverrideNode
