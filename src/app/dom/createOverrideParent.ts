import { globalWrapper } from '../../utilities'
import appendOverrideNode from './appendOverrideNode'
import { CreateOverrideParams } from './types'

const createOverrideParent: (_: CreateOverrideParams) => void =
	({ settingName, settingsPath, options }: CreateOverrideParams): void => {
		const overrideNode: HTMLElement = globalWrapper.document.createElement('details')

		const overrideName: HTMLElement = globalWrapper.document.createElement('summary')
		overrideName.innerHTML = settingName
		overrideNode.appendChild(overrideName)

		appendOverrideNode({ options, overrideNode, settingsPath })
	}

export default createOverrideParent
