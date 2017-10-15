import Points from '../types/Points'
import { pointAlongRightEdge, pointAlongTopEdge } from './stripePoints'

const firstPoint: Points = ({ outline, stripeStartsInTopLeftHalf, originAndSize, stripeStart }) => {
	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge({ originAndSize, stripePosition: stripeStart }))
	}
	else {
		outline.push(pointAlongRightEdge({ originAndSize, stripePosition: stripeStart }))
	}
}

export default firstPoint
