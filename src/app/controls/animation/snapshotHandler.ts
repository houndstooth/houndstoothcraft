import { mixDownContexts, saveCanvas } from '../../render'

const snapshotHandler: () => void =
	(): void => {
		mixDownContexts.default()
		saveCanvas.default()
	}

export default snapshotHandler
