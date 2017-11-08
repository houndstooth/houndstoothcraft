import { NullarySideEffector } from '../../utilities'
import { applyBackgroundColor } from './applyBackgroundColor'
import { applyOpacity } from './applyOpacity'

const applyViewForGrid: NullarySideEffector =
	(): void => {
		applyOpacity()
		applyBackgroundColor()
	}

export { applyViewForGrid }
