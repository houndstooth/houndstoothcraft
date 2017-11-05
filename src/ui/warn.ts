// tslint:disable:no-unsafe-any

import { PageElement } from '../page/types'
import { document } from '../utilities/windowWrapper'

const warn: (warningMessage: string) => void =
	(warningMessage: string): void => {
		const warning: PageElement = document.createElement('div')
		warning.innerHTML = warningMessage

		const warningsContainer: PageElement = document.querySelector('#warnings-container')

		warningsContainer.appendChild(warning)
	}

export { warn }
