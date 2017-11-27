// tslint:disable:no-unsafe-any

import { documentWrapper } from '../../utilities'
import { PageElement } from './types'

const deleteElementIfExists: (selector: string) => void =
	(selector: string): void => {
		const element: PageElement = documentWrapper.querySelector(selector)
		if (element) {
			element.parentNode.removeChild(element)
		}
	}

export default deleteElementIfExists
