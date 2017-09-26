export default ({ mockClassList, mockChildren, mockAttributeObject, parentNodeRemoveChildSpy, parentNodeInsertBeforeSpy } = {}) => ({
	classList: {
		add: className => mockClassList.push(className),
	},
	appendChild: child => mockChildren.push(child),
	innerHTML: '',
	style: {},
	setAttribute: (attribute, value) => mockAttributeObject[attribute] = value,
	parentNode: {
		insertBefore: parentNodeInsertBeforeSpy,
		removeChild: parentNodeRemoveChildSpy,
	},
})
