import { PageElement } from '../../../src/page'
import { MockElement } from '../../types/MockElement'
import Spy = jasmine.Spy

interface BuildMockElementParams {
	readonly attributeObject?: { [ index: string ]: string },
	readonly children?: PageElement[],
	readonly classList?: string[],
	readonly clickSpy?: Spy,
	readonly parentNodeInsertBeforeSpy?: Spy,
	readonly parentNodeRemoveChildSpy?: Spy,
}

const buildMockElement: (_?: BuildMockElementParams) => MockElement =
	(params: BuildMockElementParams): MockElement => {
		const {
			attributeObject = {},
			children = [],
			classList = [],
			clickSpy,
			parentNodeInsertBeforeSpy,
			parentNodeRemoveChildSpy,
		}: BuildMockElementParams = params || {}

		return {
			appendChild: (child: PageElement): number => children.push(child),
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

export { buildMockElement }
