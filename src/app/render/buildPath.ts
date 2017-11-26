// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'
import { Context } from '../page'
import { Path, Pixel } from './types'

const buildPath: (_: { path: Path }) => void =
	({ path }: { path: Path }): void => {
		const context: Context = getCurrentContext.main()
		context.beginPath()
		context.moveTo(path[ 0 ][ 0 ], path[ 0 ][ 1 ])
		path.slice(1).forEach((pixel: Pixel) => context.lineTo(pixel[ 0 ], pixel[ 1 ]))
	}

export { buildPath as main }
