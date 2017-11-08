import { Pixel, Px } from '../../app'

interface DoAdjustmentParams {
	halfCanvasSize: Px,
	pixel: Pixel,
	shouldAdjustForCentering: boolean,
	zoom: number,
}

export { DoAdjustmentParams }
