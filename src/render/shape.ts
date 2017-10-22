import { getCurrentContext } from '../canvas'
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

	const context = getCurrentContext()
	const shapeColorIndex = wrappedIndex({ array: shapeColorIndices, index: stripeIndex })

	const { renderTexture }: TextureSettings = getFromBaseOrDefaultPattern('textureSettings')

	if (renderTexture) {
		texture({ context, outline, shapeColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex })
	}
	else {
		solid({ context, outline, shapeColorIndex })
	}
}

export { shape }
