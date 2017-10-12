const clipPath: { ({}: { context: CanvasRenderingContext2D }): void } = ({ context }) => {
	context.save()
	context.clip()
}

export default clipPath
