const fillPath: { ({}: { context: CanvasRenderingContext2D }): void } = ({ context }) => {
	context.closePath()
	context.fill()
}

export default fillPath
