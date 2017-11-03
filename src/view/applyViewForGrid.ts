import { NullarySideEffector } from '../utilities/types'
import { applyBackgroundColor } from './applyBackgroundColor'
import { applyOpacity } from './applyOpacity'

const applyViewForGrid: NullarySideEffector =
	(): void => {
		applyOpacity()
		applyBackgroundColor()
	}

export { applyViewForGrid }
