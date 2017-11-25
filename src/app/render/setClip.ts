import { applyViewForShape, Outline } from '../../pattern'
import { main as buildPath } from './buildPath'
import { main as clipPath } from './clipPath'
import { Path } from './types'

const setClip: (_: { outline: Outline }) => void =
	({ outline }: { outline: Outline }): void => {
		const path: Path = applyViewForShape.main(outline)
		buildPath({ path })

		clipPath()
	}

export { setClip as main }
