import MockElement from '../../types/MockElement'

const buildMockElement: ({}?: {
		clickSpy?,
		mockAttributeObject?,
		mockChildren?,
		mockClassList?,
		parentNodeInsertBeforeSpy?,
		parentNodeRemoveChildSpy?,
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
		appendChild: child => mockChildren.push(child),
		classList: {
			add: className => mockClassList.push(className),
		},
		click: clickSpy,
		innerHTML: '',
		parentNode: {
			insertBefore: parentNodeInsertBeforeSpy,
			removeChild: parentNodeRemoveChildSpy,
		},
		setAttribute: (attribute, value) => mockAttributeObject[ attribute ] = value,
		style: {},
	}
}

export default buildMockElement
