// tslint:disable:variable-name

import { Frame } from './animation'
import { Address, StripePosition, Supertile, TileColorIndices, Unit } from './components'
import { Layer } from './execute'
import { Dimension } from './page'
import { Coordinate, Outline, Radian } from './space'
import { SettingsPath, SettingsStep } from './store'

const Frame: (frame: number) => Frame = frame => frame as any
const Layer: (layer: number) => Layer = layer => layer as any
const Radian: (radian: number) => Radian = radian => radian as any
const Unit: (unit: number) => Unit = unit => unit as any
const Dimension: (dimension: number) => Dimension = dimension => dimension as any
const StripePosition: (stripePosition: number) => StripePosition = stripePosition => stripePosition as any
const SettingsStep: (settingsStep: string) => SettingsStep = settingsStep => settingsStep as any

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

const SettingsPath: (settingsPath: string[]) => SettingsPath = settingsPath => settingsPath as any

export {
	Address,
	Coordinate,
	Dimension,
	Dimensions,
	Frame,
	Layer,
	Layers,
	Outline,
	SettingsPath,
	Radian,
	SettingsStep,
	StripePosition,
	StripePositions,
	Supertile,
	TileColorIndices,
	Unit,
}
