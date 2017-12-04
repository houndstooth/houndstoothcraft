// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { clearContexts, clearMixedDownContext } from '../canvas'
import { cancelPreviousPattern, clearInterval } from '../execute'
import { PageElement } from '../page'
import { resetMainHoundstooth } from '../store'

const resetInterface: NullarySideEffector =
	(): void => {
		const descriptions: PageElement = documentWrapper.querySelector('#descriptions-container')
		descriptions.innerHTML = ''

		clearContexts.default()
		clearMixedDownContext.default()

		clearInterval.default('interval')
		clearInterval.default('gridProgressInterval')

		state.resolveGrid()

		cancelPreviousPattern.default()
		resetMainHoundstooth.default()
	}

export default resetInterface
