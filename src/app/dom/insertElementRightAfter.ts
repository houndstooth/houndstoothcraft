// tslint:disable:no-unsafe-any

import { InsertElementRightAfter, PageElement } from './types'

const insertElementRightAfter: InsertElementRightAfter =
	(element: PageElement, elementRightAfterWhichToInsert: PageElement): void =>
		elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)

export default insertElementRightAfter
