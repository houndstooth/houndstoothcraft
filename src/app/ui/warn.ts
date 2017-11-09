// tslint:disable:no-unsafe-any

import { documentWrapper } from '../../utilities'
import { PageElement } from '../page'

const warn: (warningMessage: string) => void =
	(warningMessage: string): void => {
		const warning: PageElement = documentWrapper.createElement('div')
		warning.innerHTML = warningMessage

		const warningsContainer: PageElement = documentWrapper.querySelector('#warnings-container')

		warningsContainer.appendChild(warning)
	}

export { warn }
