const getTestMarkersContext: () => CanvasRenderingContext2D =
	(): CanvasRenderingContext2D => {
		const testMarkersCanvas: HTMLCanvasElement = document.querySelector('#test-markers-canvas') as HTMLCanvasElement

		return testMarkersCanvas.getContext('2d') as CanvasRenderingContext2D
	}

export default getTestMarkersContext
