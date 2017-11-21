import { exportFrame } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { mixDownContexts } from '../render'

const snapshotClickHandler: NullarySideEffector =
	(): void => {
		mixDownContexts()
		exportFrame()
	}

export { snapshotClickHandler }
