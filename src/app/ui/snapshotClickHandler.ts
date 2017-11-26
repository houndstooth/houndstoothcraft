import { NullarySideEffector } from '../../utilities'
import { exportCanvas, mixDownContexts } from '../canvas'

const snapshotClickHandler: NullarySideEffector =
	(): void => {
		mixDownContexts.main()
		exportCanvas.main()
	}

export { snapshotClickHandler as main }
