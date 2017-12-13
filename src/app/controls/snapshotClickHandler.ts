import { exportCanvas, mixDownContexts } from '../render'

const snapshotClickHandler: () => void =
	(): void => {
		mixDownContexts.default()
		exportCanvas.default()
	}

export default snapshotClickHandler
