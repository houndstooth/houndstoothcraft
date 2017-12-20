import { mixDownContexts, saveCanvas } from '../../render'

const snapshotClickHandler: () => void =
	(): void => {
		mixDownContexts.default()
		saveCanvas.default()
	}

export default snapshotClickHandler
