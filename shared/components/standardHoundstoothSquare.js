import drawStripedSquare from '../render/drawMinorDiagonalStripedSquare'
import drawSolidSquare from '../render/drawSolidSquare'
import { COLOR_A, COLOR_B } from '../common/customize'

export default ({ origin, size, squareType, scaleFromCenter }) => {
	size = size || 1
	if (squareType == "STRIPED_A") {
		drawStripedSquare({ origin, size, originColor: COLOR_A, otherColor: COLOR_B, scaleFromCenter })
	} else if (squareType == "STRIPED_B") {
		drawStripedSquare({ origin, size, originColor: COLOR_B, otherColor: COLOR_A, scaleFromCenter })
	} else {
		drawSolidSquare({ origin, size, color: squareType, scaleFromCenter })
	}
}