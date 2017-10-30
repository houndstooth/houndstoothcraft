// tslint:disable:no-unsafe-any

import { document } from '../utilities/windowWrapper'
import { PageElement } from './types'

const deleteElementIfExists: (selector: string) => void =
	(selector: string): void => {
		const element: PageElement = document.querySelector(selector)
		if (element) {
			element.parentNode.removeChild(element)
		}
	}

export { deleteElementIfExists }
