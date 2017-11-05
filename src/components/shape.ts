import { Outline } from '../space'
import { getFromBaseOrDefaultPattern, TextureSettings } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import { solid } from './solid'
import { texture } from './texture'
import { ShapeColorIndex, ShapeParams } from './types'

const shape: (_: ShapeParams) => void =
	({ tileOrigin, tileSize, shapeColorIndices, stripeIndex, getOutline, outlineOptions }: ShapeParams): void => {
		const outline: Outline = getOutline({ tileOrigin, tileSize, outlineOptions })
		if (!outline) {
			return
		}

		const shapeColorIndex: ShapeColorIndex = wrappedIndex({ array: shapeColorIndices, index: stripeIndex })

		const { executeTexture }: TextureSettings = getFromBaseOrDefaultPattern('textureSettings')

		if (executeTexture) {
			texture({ outline, tileOrigin, tileSize, executeTexture, shapeColorIndex })
		}
		else {
			solid({ outline, shapeColorIndex })
		}
	}

export { shape }
