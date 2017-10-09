const buildMockElement: any = ({
	mockClassList,
	mockChildren,
	mockAttributeObject,
	parentNodeRemoveChildSpy,
	parentNodeInsertBeforeSpy,
	clickSpy,
}: {
	mockClassList?,
	mockChildren?,
	mockAttributeObject?,
	parentNodeRemoveChildSpy?,
	parentNodeInsertBeforeSpy?,
	clickSpy?
	} = {}) => ({
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
})

export default buildMockElement
