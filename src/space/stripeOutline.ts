import { GetOutline } from './types'
import firstPoint from './stripe/firstPoint'
import middlePoints from './stripe/middlePoints'
import lastPoints from './stripe/lastPoints'

const stripeOutline: GetOutline = ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions
	const originAndSize = { x: tileOrigin[ 0 ] as any, y: tileOrigin[ 1 ] as any, size: tileSize }

	const stripeStartsInTopLeftHalf = stripeStart as any < 1
	const stripeEndsInBottomRightHalf = stripeEnd as any > 1

	const outline = []
	firstPoint({ outline, stripeStartsInTopLeftHalf, originAndSize, stripeStart })
	middlePoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeEnd })
	lastPoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart })

	return outline
}

export default stripeOutline
