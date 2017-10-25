import { PageElement } from '../../../src/page/types/PageElement'
import { MockElement } from '../../types/MockElement'
import Spy = jasmine.Spy

const buildMockElement: (_?: {
		clickSpy?: Spy,
		mockAttributeObject?: { [ index: string ]: string },
		mockChildren?: PageElement[],
		mockClassList?: string[],
		parentNodeInsertBeforeSpy?: Spy,
		parentNodeRemoveChildSpy?: Spy,
	}) => MockElement = (params = {}) => {
	const {
		clickSpy,
		mockAttributeObject = {},
		mockChildren = [],
		mockClassList = [],
		parentNodeInsertBeforeSpy,
		parentNodeRemoveChildSpy,
	} = params

	return {
		appendChild: (child: PageElement) => mockChildren.push(child),
		classList: {
			add: (className: string) => mockClassList.push(className),
		},
		click: clickSpy,
		innerHTML: '',
		parentNode: {
			insertBefore: parentNodeInsertBeforeSpy,
			removeChild: parentNodeRemoveChildSpy,
		},
		setAttribute: (attribute: string, value: string) => mockAttributeObject[ attribute ] = value,
		style: {},
	}
}

export { buildMockElement }
