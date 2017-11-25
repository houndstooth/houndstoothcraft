import { NullarySideEffector } from '../../utilities'
import { main as applyBackgroundColor } from './applyBackgroundColor'
import { main as applyOpacity } from './applyOpacity'

const applyViewForGrid: NullarySideEffector =
	(): void => {
		applyOpacity()
		applyBackgroundColor()
	}

export { applyViewForGrid as main }
