import { parseOverrideId } from '../dom'
import { FullSettingPath } from '../settings'
import getOverrideParentNode from './getOverrideParentNode'
import { OverrideParentNode } from './types'

const toggleOverrideParentOpen: (_: Event) => void =
	(event: Event): void => {
		const overrideParentSummary: HTMLElement = event.target as HTMLElement
		const fullSettingPath: FullSettingPath = parseOverrideId.default(overrideParentSummary.id)
		const overrideParentNode: OverrideParentNode = getOverrideParentNode(fullSettingPath)
		const overrideParentDetails: HTMLDetailsElement = overrideParentSummary.parentNode as HTMLDetailsElement
		overrideParentNode.open = !overrideParentDetails.open
	}

export default toggleOverrideParentOpen
