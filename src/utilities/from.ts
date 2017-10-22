// tslint:disable:variable-name

import { Frame } from '../animation'
import { Address, StripePosition, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Coordinate, Radian } from '../space'

const Frame: (frame: Frame) => number = frame => frame as any
const Layer: (layer: Layer) => number = layer => layer as any
const Radian: (radian: Radian) => number = radian => radian as any
const Unit: (units: Unit) => number = units => units as any
const Dimension: (dimension: Dimension) => number = dimension => dimension as any
const StripePosition: (stripePosition: StripePosition) => number = stripePosition => stripePosition as any

const Coordinate: (coordinate: Coordinate) => number[] = coordinate => coordinate as any
const Address: (address: Address) => number[] = address => address as any

export {
	Address,
	Coordinate,
	Dimension,
	Frame,
	Layer,
	Radian,
	StripePosition,
	Unit,
}
