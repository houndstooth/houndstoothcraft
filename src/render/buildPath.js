export default ({ context, outline }) => {
	context.beginPath()
	context.moveTo(outline[ 0 ][ 0 ], outline[ 0 ][ 1 ])
	outline.slice(1).forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))
}
