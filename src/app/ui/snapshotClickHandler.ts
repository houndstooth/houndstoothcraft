import { exportCanvas } from '../canvas'
import { NullarySideEffector } from '../../utilities'
import { mixDownContexts } from '../render'

const snapshotClickHandler: NullarySideEffector =
	(): void => {
		mixDownContexts.main()
		exportCanvas.main()
	}

export { snapshotClickHandler as main }
