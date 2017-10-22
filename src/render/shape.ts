import { getCurrentContext } from '../canvas'
import { getFromBaseOrDefaultPattern, TextureSettings } from '../store'
import { isDefined, wrappedIndex } from '../utilities/codeUtilities'
import { solid } from './solid'
import { texture } from './texture'
import { ShapeParams } from './types'

const shape: (_: ShapeParams) => void = params => {
	const { tileOrigin, tileSize, tileColorIndices, stripeIndex, getOutline, outlineOptions } = params
	const outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) {
		return
	}

	const context = getCurrentContext()
	const shapeColorIndex = wrappedIndex({ array: tileColorIndices, index: stripeIndex })

	const textureSettings: Partial<TextureSettings> = getFromBaseOrDefaultPattern('texture')
	const renderTexture = textureSettings.renderTexture

	const renderFunction = isDefined(renderTexture) ? texture : solid
	renderFunction({ context, outline, tileColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex })
}

export { shape }
