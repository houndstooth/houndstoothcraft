import { from, globalWrapper } from '../../utilities'
import appendOverrideNode from './appendOverrideNode'
import { CreateOverrideParams } from './types'

const createOverrideParent: (_: CreateOverrideParams) => void =
	({ settingName, settingPath, options }: CreateOverrideParams): void => {
		const overrideNode: HTMLElement = globalWrapper.document.createElement('details')

		const overrideName: HTMLElement = globalWrapper.document.createElement('summary')
		overrideName.innerHTML = from.SettingStep(settingName)
		overrideNode.appendChild(overrideName)

		appendOverrideNode({ options, overrideNode, settingPath })
	}

export default createOverrideParent
