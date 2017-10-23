import { Outline } from './Outline'
import { TileOriginAndSize } from '../../components/types/TileOriginAndSize'
import { OutlineOptions } from './OutlineOptions'

interface PointsParams extends TileOriginAndSize, OutlineOptions {
	outline: Outline,
	stripeEndsInBottomRightHalf?: boolean,
	stripeStartsInTopLeftHalf?: boolean,
}

export { PointsParams }
