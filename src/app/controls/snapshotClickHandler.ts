import { NullarySideEffector } from '../../utilities'
import { exportCanvas, mixDownContexts } from '../render'

const snapshotClickHandler: NullarySideEffector =
	(): void => {
		mixDownContexts.default()
		exportCanvas.default()
	}

export default snapshotClickHandler
