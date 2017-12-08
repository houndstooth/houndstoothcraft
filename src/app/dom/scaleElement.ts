import { from } from '../../utilities'
import { Dimensions } from './types'

const scaleElement: (_: { dimensions: Dimensions, element: HTMLElement }) => void =
	({ dimensions, element }: { dimensions: Dimensions, element: HTMLElement }): void => {
		const [ x, y ] = from.Dimensions(dimensions)
		element.style.width = inPx(x)
		element.style.height = inPx(y)
	}

const inPx: (px: number) => string =
	(px: number): string => `${px}px`

export default scaleElement
