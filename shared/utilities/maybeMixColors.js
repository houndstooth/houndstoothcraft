import { GINGHAM_MODE } from '../common/customize'
import mixColors from './mixColors'

export default ({originColor: previousOriginColor, otherColor: previousOtherColor}) => {
	let originColor, otherColor
	if (GINGHAM_MODE) {
		originColor = mixColors(previousOriginColor, previousOtherColor)
		otherColor = mixColors(previousOriginColor, previousOtherColor)
	} else {
		originColor = previousOriginColor
		otherColor = previousOtherColor
	}
	return { originColor, otherColor }
}