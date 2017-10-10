type RenderFunction = {
	({}: {
		context: any,
		outline: number[][],
		renderTexture?: { ({}: {}): void },
		shapeColorIndex?: number,
		tileColorIndices?: number[]
		tileOrigin?: number[],
		tileSize?: number,
	}): void,
}

export default RenderFunction
