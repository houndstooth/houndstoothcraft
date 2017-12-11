type DataBlob = Blob | {}

interface CanvasState {
	contexts: CanvasRenderingContext2D[],
	mixedDownContext: CanvasRenderingContext2D,
}

export {
	CanvasState,
	DataBlob,
}
