import { TileOriginAndSize } from '../../components/types/TileOriginAndSize'
import { Outline } from './Outline'
import { OutlineOptions } from './OutlineOptions'

interface PointsParams extends TileOriginAndSize, OutlineOptions {
	outline: Outline,
	stripeEndsInBottomRightHalf?: boolean,
	stripeStartsInTopLeftHalf?: boolean,
}

export { PointsParams }
