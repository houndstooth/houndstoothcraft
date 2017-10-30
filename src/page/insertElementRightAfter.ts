// tslint:disable:no-unsafe-any

import { PageElement } from './types'

const insertElementRightAfter: (element: PageElement, elementRightAfterWhichToInsert: PageElement) => void =
	(element: PageElement, elementRightAfterWhichToInsert: PageElement): void =>
		elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)

export { insertElementRightAfter }
