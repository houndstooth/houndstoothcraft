import drawStripedSquare from '../render/drawMinorDiagonalStripedSquare'
import drawSolidSquare from '../render/drawSolidSquare'
import { COLOR_A, COLOR_B } from '../common/customize'

export default ({ origin, size, squareType, scaleFromGridCenter }) => {
	size = size || 1
	if (squareType == "STRIPED_A") {
		drawStripedSquare({ origin, size, originColor: COLOR_A, otherColor: COLOR_B, scaleFromGridCenter })
	} else if (squareType == "STRIPED_B") {
		drawStripedSquare({ origin, size, originColor: COLOR_B, otherColor: COLOR_A, scaleFromGridCenter })
	} else {
		drawSolidSquare({ origin, size, color: squareType, scaleFromGridCenter })
	}
}