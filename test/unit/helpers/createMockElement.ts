import { CreateMockElementParams, MockElement } from './types'

const createMockElement: (_?: CreateMockElementParams) => MockElement =
	(createMockElementParams?: CreateMockElementParams): MockElement => {
		const {
			attributeObject = {},
			children = [],
			classList = [],
			clickSpy,
			parentNodeInsertBeforeSpy,
			parentNodeRemoveChildSpy,
		}: CreateMockElementParams = createMockElementParams || {}

		return {
			appendChild: (child: HTMLElement): number => children.push(child),
			classList: {
				add: (className: string): number => classList.push(className),
			},
			click: clickSpy,
			innerHTML: '',
			parentNode: {
				insertBefore: parentNodeInsertBeforeSpy,
				removeChild: parentNodeRemoveChildSpy,
			},
			setAttribute: (attribute: string, value: string): string => attributeObject[ attribute ] = value,
			style: {},
		}
	}

export default createMockElement
