import { Dimension } from '../../page'

interface SquareCanvasSize extends Dimension {
	_SquareCanvasSizeBrand
}

enum _OblongCanvasSizeBrand {}
type OblongCanvasSize = _OblongCanvasSizeBrand & Dimension[]

type CanvasSize = SquareCanvasSize | OblongCanvasSize

export { CanvasSize }
