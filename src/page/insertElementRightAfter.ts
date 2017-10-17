import PageElement from './types/PageElement'

const insertElementRightAfter: (element: PageElement, elementRightAfterWhichToInsert: PageElement) => void =
	(element, elementRightAfterWhichToInsert) =>
		elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)

export default insertElementRightAfter
