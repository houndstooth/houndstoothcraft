import Spy = jasmine.Spy

type MockElement = {
	classList: {
		add: { (className: string): void },
	},
	appendChild: { (child: HTMLElement): void },
	innerHTML: string,
	style: object,
	setAttribute: { (attribute: string, value: string): void }
	parentNode: {
		insertBefore: Spy,
		removeChild: Spy,
	},
	click: Spy,
	href?: string,
	download?: string,
	nextSibling?: Element,
}

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
	const {
		mockClassList = [],
		mockChildren = [],
		mockAttributeObject = {},
		parentNodeRemoveChildSpy = null,
		parentNodeInsertBeforeSpy = null,
		clickSpy = null,
	} = params || {}
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
