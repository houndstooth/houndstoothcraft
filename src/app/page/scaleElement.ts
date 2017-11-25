import * as from from '../../from'
import { Dimensions, PageElement } from './types'

const scaleElement: (_: { dimensions: Dimensions, element: PageElement }) => void =
	({ dimensions, element }: { dimensions: Dimensions, element: PageElement }): void => {
		const [ x, y ] = from.Dimensions(dimensions)
		element.style.width = inPx(x)
		element.style.height = inPx(y)
	}

const inPx: (px: number) => string =
	(px: number): string => `${px}px`

export { scaleElement as main }
