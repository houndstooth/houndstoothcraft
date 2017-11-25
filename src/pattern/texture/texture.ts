import { resetClip, setClip } from '../../app'
import { TextureParams } from './types'

const texture: (_: TextureParams) => void =
	({ outline, tileSize, executeTexture, shapeColorIndex }: TextureParams): void => {
		setClip.main({ outline })

		executeTexture({ shapeColorIndex, tileSize })

		resetClip.main()
	}

export { texture as main }
