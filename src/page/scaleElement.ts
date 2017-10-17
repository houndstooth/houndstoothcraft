import { Dimension, PageElement } from './types'

const scaleElement: { ({}: { dimensions: Dimension[], element: PageElement }): void } = ({ dimensions, element }) => {
	element.style.width = inPx(dimensions[ 0 ] as any)
	element.style.height = inPx(dimensions[ 1 ] as any)
}

const inPx = (pixelCount: number): string => `${pixelCount}px`

export default scaleElement
