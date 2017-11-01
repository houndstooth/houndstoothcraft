// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'
import { PageElement } from './types'

const getFont: NullarySideEffector =
	(): void => {
		const link: PageElement = document.createElement('link')
		document.body.appendChild(link)
		link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Gilda+Display')
		link.setAttribute('rel', 'stylesheet')
	}

export { getFont }
