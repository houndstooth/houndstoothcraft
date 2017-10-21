// tslint:disable:variable-name

import { Frame } from './animation'
import { Address, StripePosition, Supertile, TileColorIndices, Units } from './components'
import { Layer } from './execute'
import { Dimension } from './page'
import { Coordinate, Outline, Radian } from './space'
import { PropertyPath } from './utilities/types'

const Frame: (frame: number) => Frame = frame => frame as any
const Layer: (layer: number) => Layer = layer => layer as any
const Radian: (radian: number) => Radian = radian => radian as any
const Units: (units: number) => Units = units => units as any
const Dimension: (dimension: number) => Dimension = dimension => dimension as any
const StripePosition: (stripePosition: number) => StripePosition = stripePosition => stripePosition as any

const Layers: (layers: number[]) => Layer[] = layers => layers as any
const Dimensions: (dimensions: number[]) => Dimension[] = dimensions => dimensions as any

const Outline: (outline: number[][]) => Outline = outline => outline.map(Coordinate)

const Coordinate: (coordinate: number[]) => Coordinate = coordinate =>
	coordinate.map(dimension => dimension as any) as Coordinate

const TileColorIndices: (tileColorIndices: number[]) => TileColorIndices = tileColorIndices =>
	tileColorIndices.map(tileColorIndex => tileColorIndex as any) as TileColorIndices

const Address: (address: number[]) => Address = address =>
	address.map(index => index as any) as Address

const StripePositions: (stripePositions: number[]) => StripePosition[] = stripePositions =>
	stripePositions.map(stripePosition => stripePosition as any) as StripePosition[]

const Supertile: (supertile: number[][][]) => Supertile = supertile => supertile as any

const PropertyPath: (propertyPath: string[]) => PropertyPath = propertyPath => propertyPath as any

export {
	Address,
	Coordinate,
	Dimension,
	Dimensions,
	Frame,
	Layer,
	Layers,
	Outline,
	PropertyPath,
	Radian,
	StripePosition,
	StripePositions,
	Supertile,
	TileColorIndices,
	Units,
}
