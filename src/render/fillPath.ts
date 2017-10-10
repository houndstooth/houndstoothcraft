const fillPath: { ({}: { context: any }): void } = ({ context }) => {
	context.closePath()
	context.fill()
}

export default fillPath
