import { CANVAS_SIZE, from } from '../../../src/indexForTest'
import getTestMarkersContext from './getTestMarkersContext'

const testMarkersClear: () => void =
	(): void => {
		const testMarkersContext: CanvasRenderingContext2D = getTestMarkersContext()

		// tslint:disable-next-line:no-unsafe-any
		testMarkersContext.clearRect(0, 0, from.Px(CANVAS_SIZE), from.Px(CANVAS_SIZE))
	}

export default testMarkersClear
