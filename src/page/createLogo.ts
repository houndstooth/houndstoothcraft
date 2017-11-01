// tslint:disable:no-any no-unsafe-any no-magic-numbers max-line-length
import { Unit } from '../components/types'
import { Path, Pixel } from '../render'
import { Coordinate, Outline } from '../space'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'
import { Px } from './types'

const LOGO_SCALE: number = 4

const createLogo: NullarySideEffector =
	(): void => {
		const xmlns: string = 'http://www.w3.org/2000/svg'
		const logo: SVGSVGElement = document.createElementNS(xmlns, 'svg')
		const width: Px = to.Px(from.Unit(to.Unit(46)) * LOGO_SCALE)
		const height: Px = to.Px(from.Unit(to.Unit(10)) * LOGO_SCALE)
		logo.style.width = width.toString()
		logo.style.height = height.toString()
		logo.style.fill = '#000'
		logo.style.margin = 'auto'
		logo.style.display = 'block'
		logo.style.padding = '5px'
		document.body.appendChild(logo)

		const hOutline: Outline = to.Outline([ [ 0, 3 ], [ 0, 7 ], [ 1, 6 ], [ 1, 4 ], [ 2, 5 ], [ 3, 4 ], [ 3, 6 ], [ 4, 7 ], [ 4, 3 ], [ 3, 2 ], [ 3, 0 ], [ 2, 1 ], [ 1, 0 ], [ 1, 2 ] ])
		const oOutline: Outline = to.Outline([ [ 0, 2 ], [ 2, 4 ], [ 4, 2 ], [ 2, 0 ] ])
		const uOutline: Outline = to.Outline([ [ 0, 2 ], [ 2, 4 ], [ 4, 2 ], [ 4, 0 ], [ 2, 2 ], [ 0, 0 ] ])
		const nOutline: Outline = to.Outline([ [ 0, 4 ], [ 0, 8 ], [ 1, 7 ], [ 1, 5 ], [ 2, 6 ], [ 4, 4 ], [ 4, 0 ], [ 3, 1 ], [ 3, 3 ], [ 2, 2 ] ])
		const dOutline: Outline = to.Outline([ [ 0, 4 ], [ 2, 6 ], [ 4, 4 ], [ 4, 0 ], [ 3, 1 ], [ 3, 3 ], [ 2, 2 ] ])
		const sOutline: Outline = to.Outline([ [ 0, 3 ], [ 1, 4 ], [ 1, 6 ], [ 4, 3 ], [ 3, 2 ], [ 3, 0 ] ])
		const tOutline: Outline = to.Outline([ [ 2, 2 ], [ 4, 4 ], [ 6, 2 ], [ 5, 1 ], [ 7, 1 ], [ 8, 0 ], [ 0, 0 ], [ 1, 1 ], [ 3, 1 ] ])

		const hLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		hLetter1.setAttribute('d', pather(scale(transpose(hOutline, to.Unit(1), to.Unit(2)), LOGO_SCALE)))
		logo.appendChild(hLetter1)

		const oLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		oLetter1.setAttribute('d', pather(scale(transpose(oOutline, to.Unit(5), to.Unit(3)), LOGO_SCALE)))
		logo.appendChild(oLetter1)

		const uLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		uLetter1.setAttribute('d', pather(scale(transpose(uOutline, to.Unit(9), to.Unit(3)), LOGO_SCALE)))
		logo.appendChild(uLetter1)

		const nLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		nLetter1.setAttribute('d', pather(scale(transpose(nOutline, to.Unit(13), to.Unit(1)), LOGO_SCALE)))
		logo.appendChild(nLetter1)

		const dLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		dLetter1.setAttribute('d', pather(scale(transpose(dOutline, to.Unit(17), to.Unit(1)), LOGO_SCALE)))
		logo.appendChild(dLetter1)

		const sLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		sLetter1.setAttribute('d', pather(scale(transpose(sOutline, to.Unit(21), to.Unit(2)), LOGO_SCALE)))
		logo.appendChild(sLetter1)

		const tLetter1: SVGPathElement = document.createElementNS(xmlns, 'path')
		tLetter1.setAttribute('d', pather(scale(transpose(tOutline, to.Unit(23), to.Unit(3)), LOGO_SCALE)))
		logo.appendChild(tLetter1)

		const oLetter2: SVGPathElement = document.createElementNS(xmlns, 'path')
		oLetter2.setAttribute('d', pather(scale(transpose(oOutline, to.Unit(29), to.Unit(3)), LOGO_SCALE)))
		logo.appendChild(oLetter2)

		const oLetter3: SVGPathElement = document.createElementNS(xmlns, 'path')
		oLetter3.setAttribute('d', pather(scale(transpose(oOutline, to.Unit(33), to.Unit(3)), LOGO_SCALE)))
		logo.appendChild(oLetter3)

		const tLetter2: SVGPathElement = document.createElementNS(xmlns, 'path')
		tLetter2.setAttribute('d', pather(scale(transpose(tOutline, to.Unit(35), to.Unit(3)), LOGO_SCALE)))
		logo.appendChild(tLetter2)

		const hLetter2: SVGPathElement = document.createElementNS(xmlns, 'path')
		hLetter2.setAttribute('d', pather(scale(transpose(hOutline, to.Unit(41), to.Unit(2)), LOGO_SCALE)))
		logo.appendChild(hLetter2)
	}

const transpose: (outline: Outline, xShift: Unit, yShift: Unit) => Outline =
	(outline: Outline, xShift: Unit, yShift: Unit): Outline =>
		outline.map(([ x, y ]: Coordinate): Coordinate =>
			to.Coordinate([ from.Unit(x) + from.Unit(xShift), from.Unit(y) + from.Unit(yShift) ]))

const scale: (outline: Outline, scalar: number) => Path =
	(outline: Outline, scalar: number): Path =>
		to.Path(outline.map(([ x, y ]: Coordinate): Pixel =>
			to.Pixel([ from.Unit(x) * scalar, from.Unit(y) * scalar ])))

const pather: (path: Path) => string =
	(path: Path): string => {
		let str: string = `M ${path.slice().splice(-1, 1).join(' ')}`
		path.forEach((point: Pixel): string => str += ` L ${point.join(' ')}`)
		str += ' Z'

		return str
	}

export { createLogo }
