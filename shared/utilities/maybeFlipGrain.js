import { FLIP_GRAIN } from '../common/customize'

export default ({ originColor, otherColor }) => {
	if (FLIP_GRAIN) {
		const dummy = originColor
		originColor = otherColor
		otherColor = dummy
	}

	return { originColor, otherColor }
}