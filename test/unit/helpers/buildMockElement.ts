import { BuildMockElementParams, MockElement } from './types'

const buildMockElement: (_?: BuildMockElementParams) => MockElement =
	(buildMockElementParams?: BuildMockElementParams): MockElement => {
		const {
			attributeObject = {},
			children = [],
			classList = [],
			clickSpy,
			parentNodeInsertBeforeSpy,
			parentNodeRemoveChildSpy,
		}: BuildMockElementParams = buildMockElementParams || {}

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

export default buildMockElement
