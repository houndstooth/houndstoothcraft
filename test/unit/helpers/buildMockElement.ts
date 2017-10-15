import MockElement from '../../types/MockElement'

const buildMockElement: {
	({}?: {
		mockClassList?,
		mockChildren?,
		mockAttributeObject?,
		parentNodeRemoveChildSpy?,
		parentNodeInsertBeforeSpy?,
		clickSpy?,
	}): MockElement,
} = (params = {}) => {
	const {
		mockClassList = [],
		mockChildren = [],
		mockAttributeObject = {},
		parentNodeRemoveChildSpy,
		parentNodeInsertBeforeSpy,
		clickSpy,
	} = params

	return {
		classList: {
			add: className => mockClassList.push(className),
		},
		appendChild: child => mockChildren.push(child),
		innerHTML: '',
		style: {},
		setAttribute: (attribute, value) => mockAttributeObject[ attribute ] = value,
		parentNode: {
			insertBefore: parentNodeInsertBeforeSpy,
			removeChild: parentNodeRemoveChildSpy,
		},
		click: clickSpy,
	}
}

export default buildMockElement
