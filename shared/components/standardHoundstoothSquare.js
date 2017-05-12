import drawStripedSquare from '../render/drawMinorDiagonalStripedSquare'
import drawSolidSquare from '../render/drawSolidSquare'

export default ({ origin, size, squareType, scaleFromCenter }) => {
	size = size || 1
	if (squareType == "STRIPED_A") {
		drawStripedSquare({ origin, size, originColor: "WHITE", otherColor: "BLACK", scaleFromCenter })
	} else if (squareType == "STRIPED_B") {
		drawStripedSquare({ origin, size, originColor: "BLACK", otherColor: "WHITE", scaleFromCenter })
	} else {
		drawSolidSquare({ origin, size, color: squareType, scaleFromCenter })
	}
}