import MockElement from '../../types/MockElement'

type BuildMockElement = {
	({}?: {
		mockClassList?,
		mockChildren?,
		mockAttributeObject?,
		parentNodeRemoveChildSpy?,
		parentNodeInsertBeforeSpy?,
		clickSpy?,
	}): MockElement,
}

const buildMockElement: BuildMockElement = params => {
	const paramsWithFallback = params || {}
	const {
		mockClassList = [],
		mockChildren = [],
		mockAttributeObject = {},
		parentNodeRemoveChildSpy,
		parentNodeInsertBeforeSpy,
		clickSpy,
	} = paramsWithFallback

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
