interface SquareCanvasSize extends Number {
	_SquareCanvasSizeBrand
}

enum _OblongCanvasSizeBrand {}
type OblongCanvasSize = _OblongCanvasSizeBrand & number[]

type CanvasSize = SquareCanvasSize | OblongCanvasSize

export default CanvasSize
