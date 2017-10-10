const clipPath: { ({}: { context: any }): void } = ({ context }) => {
	context.save()
	context.clip()
}

export default clipPath
