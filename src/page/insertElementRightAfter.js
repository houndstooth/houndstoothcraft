const insertElementRightAfter = (element, elementRightAfterWhichToInsert) => {
	elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)
}

export default insertElementRightAfter
