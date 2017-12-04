// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'
import { Context } from '../dom'
import { Path, Pixel } from './types'

const buildPath: (_: { path: Path }) => void =
	({ path }: { path: Path }): void => {
		const context: Context = getCurrentContext.default()
		context.beginPath()
		context.moveTo(path[ 0 ][ 0 ], path[ 0 ][ 1 ])
		path.slice(1).forEach((pixel: Pixel) => context.lineTo(pixel[ 0 ], pixel[ 1 ]))
	}

export default buildPath
