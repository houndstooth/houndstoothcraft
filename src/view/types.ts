import { Px } from '../page'
import { Pixel } from '../render'

interface DoAdjustmentParams {
	halfCanvasSize: Px,
	pixel: Pixel,
	shouldAdjustForCentering: boolean,
	zoom: number,
}

export { DoAdjustmentParams }
