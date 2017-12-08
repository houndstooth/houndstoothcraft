// tslint:disable:no-unsafe-any

import { InsertElementRightAfter } from './types'

const insertElementRightAfter: InsertElementRightAfter =
	(element: HTMLElement, elementRightAfterWhichToInsert: HTMLElement): void => {
		if (elementRightAfterWhichToInsert.parentNode) {
			elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)
		}
	}

export default insertElementRightAfter
