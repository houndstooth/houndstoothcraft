import { CreateMockElementParams, MockElement } from './types'

const createMockElement: (_?: CreateMockElementParams) => MockElement =
	(createMockElementParams?: CreateMockElementParams): MockElement => {
		const {
			attributeObject = {},
			children = [],
			classList = [],
			clickSpy,
			id,
			parentNodeId,
			parentNodeInsertBeforeSpy,
			parentNodeOpen,
			parentNodeRemoveChildSpy,
			value,
		}: CreateMockElementParams = createMockElementParams || {}

		return {
			appendChild: (child: HTMLElement): number => children.push(child),
			classList: {
				add: (className: string): number => classList.push(className),
			},
			click: clickSpy,
			id,
			innerHTML: '',
			parentNode: {
				id: parentNodeId,
				insertBefore: parentNodeInsertBeforeSpy,
				open: parentNodeOpen,
				removeChild: parentNodeRemoveChildSpy,
			},
			setAttribute: (attribute: string, value: string): string => attributeObject[ attribute ] = value,
			style: {},
			value,
		}
	}

export default createMockElement
