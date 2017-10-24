import { getFromBaseOrDefaultPattern, TextureSettings } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import { solid } from './solid'
import { texture } from './texture'
import { ShapeParams } from './types'

const shape: (_: ShapeParams) => void = params => {
	const { tileOrigin, tileSize, shapeColorIndices, stripeIndex, getOutline, outlineOptions } = params
	const outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) {
		return
	}

	const shapeColorIndex = wrappedIndex({ array: shapeColorIndices, index: stripeIndex })

	const { executeTexture }: TextureSettings = getFromBaseOrDefaultPattern('textureSettings')

	if (executeTexture) {
		const shapeColorCount = shapeColorIndices.length
		texture({ outline, tileOrigin, tileSize, executeTexture, shapeColorIndex, shapeColorCount })
	}
	else {
		solid({ outline, shapeColorIndex })
	}
}

export { shape }
